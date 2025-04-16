import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: "Password does not match" });
    }

    // Success
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        email: user.email,
        name: user.name, // if you have a name field
        // optionally generate token here
      },
    });
  const token=jwt.sign({_id:user._id,role:user.role},
    process.env.JWT_KEY,{expiresIn:'1d'}

  )
  res.status(200).json({success:true,token,user:{_id:user._id,name:user.name,role:user.role},

})

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

export { login };

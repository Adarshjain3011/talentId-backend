import ContactUs from "../models/contactUs.model.js";

export const createContactUs = async (req, res) => {
  try {
    const { fullname, company, email, phone, queryOptions, message } = req.body;

    if (!fullname || !company || !email || !queryOptions || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (phone && phone.toString().length !== 10) {
      return res.status(400).json({ error: "Phone number must be 10 digits" });
    }

    const newContactUs = new ContactUs({
      fullname,
      company,
      email,
      phone,
      queryOptions,
      message,
    });

    const savedContactUs = await newContactUs.save();

    res.status(201).json(savedContactUs);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in createContactUs ", error.message);
  }
};

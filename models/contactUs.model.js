import mongoose from "mongoose";

const contactUsSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      minLength: 10,
      maxLength: 10,
    },
    queryOptions: {
      type: String,
      enum: [
        "Pricing Query",
        "Partnership inquiries",
        "Affiliate program",
        "Integration Partnership",
        "Book a demo",
        "Others",
      ],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ContactUs = mongoose.model("ContactUs", contactUsSchema);
export default ContactUs;

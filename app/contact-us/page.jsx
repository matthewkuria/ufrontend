import { SocialIcon } from "react-social-icons";

export default function Contacts() {
  return (
    <section className="  flex flex-col justify-center p-6">
      <div className="bg-blue-900 p-6 text-white rounded-lg">
        <h1 className="text-2xl py-2 font-bold">Reach out to us</h1>
        <p className="py-1">Have any  inquiries?</p>
      </div>
      <div className="flex flex-col  md:flex md:flex-row md:justify-between py-5 mt-4 ">
        <div className="p-1">
          <p className="text-blue-900 text-3xl font-bold">Get in Touch</p>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.74388633!2d36.78600742695312!3d-1.3297214999999993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f117e8b602a2d%3A0xcbadd496b3d4d07d!2sUlinzi%20Sports%20Complex%20Langata!5e0!3m2!1sen!2ske!4v1731576743607!5m2!1sen!2ske" width="500" height="300"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div className="flex flex-col">
          <div className="text-slate-500">
            <p className="text-2xl">Ulinzi FootBall Club</p>
            <p>P O Box 40668 – 00100</p>
            <p>ulinzi Sports Complex, Langata Nairobi</p>
            <p>Mobile: 0720170602</p> 
            <p>E-mail: ulinzistars@gmail.com</p>
          </div>
          <div className="mt-4">
            <p className="text-2xl"> Social Media</p>
            <div className="flex gap-3">
                <SocialIcon url="https://facebook.com" href="https://facebook.com" style={{ height: 30, width: 30 }}/>
                <SocialIcon url="https://youtube.com" style={{ height: 30, width: 30 }}/>
                <SocialIcon url="https://twitter.com" style={{ height: 30, width: 30 }}/>
                <SocialIcon url="https://instagram.com" style={{ height: 30, width: 30 }}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

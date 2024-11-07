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
          <iframe src="" width="500" height="300"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div className="flex flex-col">
          <div className="text-slate-500">
            <p className="text-2xl">Ulinzi FootBall Club</p>
            <p>P.O. Box 1018</p>
            <p>Clovis, Ca 93613</p>
            <p>Tel: xxxxxxxxxxxx</p> 
            <p>E-mail: ulinzistars@gmail.com, other email here</p>
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

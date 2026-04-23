import Image from "next/image";

export default function Contacts({ format }: { format: string }) {
  const contactP = "!p-2 !text-white !text-[24px]";
  return (
    <div id="contacts" className="section">
      <div id="overflowBody" className="sectionBody relative">
        <Image
          src={`/img/contact.${format}`}
          alt="beingBodyContact"
          width={600}
          height={600}
        />
        <div id="links" className="absolute bottom-0 ">
          <h3 className={contactP + "text-[32px]"}>Contacts</h3>

          <a href="mailto:being.body.practice@gmail.com">
            <p className={contactP}>being.body.practice@gmail.com</p>
          </a>
          <br></br>

          <a target="_blank" href="https://www.instagram.com/being.body/">
            <p className={contactP}> @Being.Body</p>
          </a>
          {/* <br></br>
          <p className={contactP}>+49 (0) 15731714372</p>

          <p className={contactP}>Emser Straße 33, 12051 Berlin</p> */}
        </div>
      </div>
    </div>
  );
}

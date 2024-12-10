import Copyright from '../copyright';
import Socials from '../socials';
import Disclaimer from '../disclaimer';

export default function Footer() {
  return (
    <footer className="flex flex-col justify-start items-center bg-grey-bg px-4">
      <div className="max-w-[1240px] pb-2">
        <div className="pb-3 flex flex-col-reverse sm:flex-row sm:justify-between items-center gap-y-2.5 w-full">
          <Copyright />
          <Socials />
        </div>
        <div>
          <Disclaimer />
        </div>
      </div>
    </footer>
  );
}

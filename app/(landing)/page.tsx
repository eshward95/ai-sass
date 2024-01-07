import LandingHero from "@/components/LandingHero";
import LandingNavbar from "@/components/LandingNavbar";

const LandingPage = () => {
  return (
    <div className="h-full">
      <LandingNavbar />
      <LandingHero />
      {/* page(unprotected)
      <div>
        <Button>
          <Link href="/sign-in">Sign in</Link>
        </Button>
        <Button>
          <Link href="/sign-up">Sign up</Link>
        </Button>
      </div> */}
    </div>
  );
};

export default LandingPage;

import { Button } from "@/components/ui/button";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div>
      page(unprotected)
      <div>
        <Button>
          <Link href="/sign-in">Sign in</Link>
        </Button>
        <Button>
          <Link href="/sign-up">Sign up</Link>
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;

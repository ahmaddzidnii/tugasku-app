import { SignUp, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";

const RegisterPage = () => {
  return (
    <div>
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        <div className="h-full lg:flex flex-col items-center justify-center px-4">
          <div className="text-center space-y-4 pt-16">
            <h1 className="font-bold text-3xl ">Selamat Datang!</h1>
            <p className="text-base text-muted-foreground">
              Login atau buat akun untuk memulai mengorganisasi tugasmu
            </p>
          </div>
          <div className="flex items-center justify-center mt-8">
            <ClerkLoaded>
              <SignUp path="/register" />
            </ClerkLoaded>
            <ClerkLoading>
              <Loader2 className="animate-spin text-muted-foreground" />
            </ClerkLoading>
          </div>
        </div>
        <div className="h-full bg-primary lg:flex items-center justify-center hidden">
          <Image
            src={"/tasks.png"}
            alt="hero image"
            width={100}
            height={100}
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

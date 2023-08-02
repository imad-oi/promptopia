"use client";

import Image from "next/image";
import Link from "next/link";

import { ClientSafeProvider, LiteralUnion, getProviders, signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { BuiltInProviderType } from "next-auth/providers/index";


type Provider = {
  id: string,
  name: string,
}

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null);
  const [toggleDropDown, setToggleDropDown] = useState<boolean>(false)

  const handleSignOut: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    await signOut();
  }


  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }
    fetchProviders();
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3" >
      <Link href="/" className="flex gap-2 flex-center">
        <Image width={30} height={30} alt="logo"
          src="/assets/images/logo.svg"
          className="object-contain" />
        <p className="logo_text"> Promptopia</p>
      </Link>



      {/* desktop navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button"
              onClick={handleSignOut} className="outline_btn">Sign out</button>

            <Link href="/profile">
              <Image width={37} height={37} alt="profile image"
                src={session?.user?.image as string}
                className="rounded-full" />
            </Link>

          </div>
        ) : (
          <>
            {
              providers && Object.values(providers).map((provider: Provider) => (
                <button
                  type="button" key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn">
                  Sign in with {provider.name}
                </button>
              ))
            }
          </>
        )}
      </div>

      {/* mobile navigation */}
      <div className="sm:hidden flex relative">
        {
          session?.user ? (
            <div className="flex">
              <Image
                width={37}
                height={37}
                alt="profile"
                src={session?.user?.image as string}
                className="rounded-full"
                onClick={() => setToggleDropDown((prev) => !prev)}
              />
              {toggleDropDown && (
                <div className="dropdown">
                  <Link
                    href="/profile"
                    className="text-center w-full dropdown_link "
                    onClick={() => setToggleDropDown(false)}
                  >My Profile</Link>
                  <Link
                    href="/create-prompt"
                    className=" text-center w-full dropdown_link"
                    onClick={() => setToggleDropDown(false)}
                  >Create Prompt</Link>
                  <button
                    className="mt-5 w-full black_btn"
                    type="button"
                    onClick={(e) => {
                      setToggleDropDown(false);
                      handleSignOut(e);
                    }} >
                    Sign out
                  </button>

                </div>
              )}
            </div>
          ) : (
            <>
              {
                providers && Object.values(providers).map((provider: Provider) => (
                  <button
                    type="button" key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn">
                    Sign in
                  </button>
                ))
              }
            </>)
        }
      </div>
    </nav>
  )
}

export default Nav


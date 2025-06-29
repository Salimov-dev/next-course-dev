"use client";

import { Button } from "@heroui/react";

import { signOutFunc } from "@/actions/logout";

const SignOutButton = () => {
  const handleSignOut = async () => {
    await signOutFunc();
  };

  return (
    <Button color="danger" onPress={handleSignOut}>
      Выйти
    </Button>
  );
};

export default SignOutButton;

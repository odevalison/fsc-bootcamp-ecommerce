"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import SignInWithGoogleButton from "./sign-in-with-google-button";

const SignInGoogleDialog = () => {
  return (
    <Dialog defaultOpen>
      <DialogContent className="rounded-3xl text-center">
        <DialogHeader>
          <DialogTitle className="text-xl">Criar uma conta</DialogTitle>
        </DialogHeader>

        <DialogDescription className="text-sm">
          Conecte-se à BEWEAR e aproveite uma experiência feita pra quem se
          veste com personalidade.
        </DialogDescription>

        <DialogFooter>
          <DialogClose asChild>
            <SignInWithGoogleButton />
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SignInGoogleDialog;

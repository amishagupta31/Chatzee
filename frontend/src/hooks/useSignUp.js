import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../lib/api";

const useSignUp = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: signupMutation, // ✅ use mutateAsync for async/await
    isPending,
    error,
  } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (err) => {
      console.error("Signup failed in useSignUp hook:", err);
    },
  });

  return { isPending, error, signupMutation };
};

export default useSignUp;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../lib/api";

const useLogin = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: loginMutation,  // ✅ renamed for use in async/await
    isPending,
    error,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (err) => {
      console.error("Login failed in useLogin hook:", err);
    },
  });

  return { error, isPending, loginMutation };
};

export default useLogin;

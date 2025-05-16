export const callChatAPI = async (message: string) => {
  const response = await fetch("https://hook.us1.make.com/your-make-webhook-id", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",https://hook.eu2.make.com/vhn8mddint8juqmv5vyo2dqc5lb9wxbf
    },
    body: JSON.stringify({ message }),
  });

  const data = await response.json();

  return {
    role: "assistant",
    content: data.reply,
  };
};

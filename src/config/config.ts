const x = {
  serviceName: "Login",
  serviceDomain: "https://localhost:3000",
  configuration: [
    {
      endpointName: "login",
      method: "POST",
      url: "/login",
      requestParam: {
        name: "manish",
        skills: ["node", "mode"],
      },
    },
    {
      endpointName: "logout?id=123",
      method: "GET",
      url: "/logout",
    },
  ],
};

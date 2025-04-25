import type { Business, Investor } from "../../index"

// Mock API service for business profile
export const API = {
  // Get business profile data
  getBusinessProfile: async (businessId: string): Promise<Business> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Return mock data
    return {
      id: businessId,
      name: "Canaberra",
      image:
        "https://cdn.builder.io/api/v1/image/assets/e6237926690d4236ab3eacc5cc13de41/e99a07fee84a8d1799a02fd8fe6e4654332c1a051012d37f7adb4797ae053852?placeholderIfAbsent=true",
      investors: "15+",
      industry: "Cafe",
      location: "Rwanda",
      description:
        "Located in the heart of Kigali, Canaberra Café blends premium Rwandan coffee, artisanal pastries, and a stylish co-working space. Catering to both locals and tourists, we offer a unique coffee experience in Rwanda's thriving hospitality market. Invest in Canaberra and be part of Kigali's growing café culture!",
      contact: {
        phone: "+250 788 123 456",
        email: "info@canaberra.rw",
        website: "www.canaberra.rw",
      },
    }
  },

  // Get similar investors for a business
  getSimilarInvestors: async (
    businessId: string,
    params: { sort: string; filter: string },
  ): Promise<{ investors: Investor[]; total: number }> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock data for similar investors
    const investors = [
      {
        id: "1",
        name: "John Doe",
        image:
          "https://s3-alpha-sig.figma.com/img/7114/8082/8f1274905c5dd3ec64fc371e22d0a227?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Sdx3NsFlrfMlVIgS44-QNkHMZu1WtwiapwDwchj9nvPqKVXkBbbJrs63dTlPi2NkuJwmqnYb7t87truDoQwJbPhXYKCgglGvF~DVapFQiS0SyxJOGO7IF1lsbhSoop5OvZf4HFTin9igxNvm20CaR-l0CG4cpoMGfiI-p5FAXW~QyVRZRqm~WQ9HZdjjSmuB~I5UWfRgN95ON75K8WTjoe9dNcygmsQ-gLJTz6uIxqumS8AeLs6zvcb67puIJicoYtEQnkx4WHYa-bHH3p3Ea1iISDwVlcu9iefQE9-WpqBys0E4rNkXacBmrWDkPEnV-PcwvblFWrwheQL0AZw73A__",
        investments: "150+",
        industry: "Agriculture",
        location: "Rwanda",
      },
      {
        id: "2",
        name: "John Doe",
        image:
          "https://s3-alpha-sig.figma.com/img/9e03/314b/6be949db4da5ca3cd5c60d680034189d?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=KejTan8a3l554QnDcf5GdIAhD3FHO7gf-nKHV8hFNTu6d9SlEdXrfrvu7RP0q5KIIs0i5pEt0Vy9XjI9dIl2Laj-eejkeMEwFevln8cIi-0YrMP~Ao-DolS11P-I3o4py1UHs1N7QsdbND1ddur~8IsLpGSs4~OFPoEfFVR2yDuFDAB4itLXeg~kxc22b3bESpu7ENsojT1HR-QKq9CDExJa-Rtm86qNLyW8DN4Bmq8pVYj6kI8g0KTV3OP-ICUEuVhuNFnpMhxTwavuejPricUfHIfXjXPnltpp-PhbgzdKOLxhJPndcqi0hQOX5v7HMJ6kfsgIq8ew42KEsFaP4A__",
        investments: "150+",
        industry: "Agriculture",
        location: "Rwanda",
      },
      {
        id: "3",
        name: "Fred Jones",
        image:
          "https://s3-alpha-sig.figma.com/img/3cdd/da3a/2fda0394c1afc604611e0a2e0dcfb59e?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=lJ1gJ0vgi860iBrKiQL4ZDZ4kDbpoYSmpu59405XqhcLuUb-4yvDdIY6d5PiNtvemO6j7pfnnaWFMRmfosSWVVqv~ViNYc5oD6uKQM3k26Tbks6GZForVwqVDez2JVkuIggwPERKekxHxioAZOJsVYF75P4N-sXZDScFbqaAgqFUkxPisfnN3o5bDt7V2JpxCxq5xYO6qj~YPd0u66HIC-WzhO3N1I-U565ThuUCPOOT2mAOeDHQAU9kPi4ukZ09ApurarVqln824js8XfZXJxDTfICMmgjnGWqpa-1zMmBVPQYIzwjxUBZeq-hsoAWt3C-bAJm2yPGoXRDMmvg3ew__",
        investments: "180+",
        industry: "Healthcare",
        location: "Rwanda",
      },
      {
        id: "4",
        name: "James Smith",
        image:
          "https://s3-alpha-sig.figma.com/img/e9a1/3591/c3d108ad4985871e6da26a9c79aee760?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=lwOyLyA2GzQvf7IJb44Bdw5lN7~Ay4cm-ShytMXm07fe-ugeecBTlovs7to6xzh1zLnd91zU2VBs2SyowN9PLoul1UFXlxNxrDnB~Vk2yV~U9S0BjSMtKfQlU4WKDWJjf7yutA5NIBcarymw9uFzAPARU-fNFxAhStPefR0mHgygcM8xIjoxhbejX2l~f-MXdy86FjZ9GARY9wLxXP3AF2tEKNADdQqOQ5cGqnV5OV-y6MApbhxlN~qwSpnFext-p8y9Ywem0IH8QuKTYm-YHSYmPQaURLwb8cWlK5colRtt60y~ZsooqCkG~WaLaNyHP~f47Hol7XbmuamOKi~Xjg__",
        investments: "220+",
        industry: "Real Estate",
        location: "Rwanda",
      },
      {
        id: "5",
        name: "Emily Winner",
        image:
          "https://s3-alpha-sig.figma.com/img/f047/9482/198a71cefee106ee862131ff6c1c18ba?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=rkF71AKYJY1m4ipP-O8uXEkLpitfc1GdQdzHWJ4Hevy85Q0jv-ZhbLW4L3fmNPUurg2tTXiKK95mPKxXMt4GGtzIacUsThp5Xhg4mUKQKkfGSlLnqg1xXgWoE-v5b0R8QWe-S5wobfIcljhDXfuIREJgGYfciirQzBA5fGm8mTW7AkqzEZbBcjeAoX9ZYehzwwpCjZY1FYzkT1jLPA78km8CjGJnx9ext3L8h30hAsoh3UX8SS-k6IYxuJ62CqBEDJe3-pgEcL3XNbNp41WC5SQfml-0YRMhFJBqQAfkOjAfN4-5Apzhc1lH3KJKX5nsFn6D5-ypDw5htHdTjjNejA__",
        investments: "160+",
        industry: "Finance",
        location: "Germany",
      },
    ]

    return {
      investors,
      total: 282,
    }
  },

  // Initiate chat with an investor
  initiateChat: async (investorId: string): Promise<{ chatId: string }> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Return mock chat ID
    return {
      chatId: `chat_${investorId}_${Date.now()}`,
    }
  },
}


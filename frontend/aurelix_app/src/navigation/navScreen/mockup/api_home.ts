import type { Investor, Region, FilterOption, SortOption } from "../../index"

const investorsData =[
  {
    "id": "1",
    "name": "Mark Robinson",
    "investments": "150+",
    "industry": "Agriculture",
    "location": "Rwanda",
    "image": "https://s3-alpha-sig.figma.com/img/7114/8082/8f1274905c5dd3ec64fc371e22d0a227?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Sdx3NsFlrfMlVIgS44-QNkHMZu1WtwiapwDwchj9nvPqKVXkBbbJrs63dTlPi2NkuJwmqnYb7t87truDoQwJbPhXYKCgglGvF~DVapFQiS0SyxJOGO7IF1lsbhSoop5OvZf4HFTin9igxNvm20CaR-l0CG4cpoMGfiI-p5FAXW~QyVRZRqm~WQ9HZdjjSmuB~I5UWfRgN95ON75K8WTjoe9dNcygmsQ-gLJTz6uIxqumS8AeLs6zvcb67puIJicoYtEQnkx4WHYa-bHH3p3Ea1iISDwVlcu9iefQE9-WpqBys0E4rNkXacBmrWDkPEnV-PcwvblFWrwheQL0AZw73A__",
    "bio": "Dedicated investor passionate about transforming the agricultural sector through innovation and sustainability. I actively support agri-tech startups, modern farming solutions, and businesses driving efficiency in food production and supply chains. Looking to connect with visionary entrepreneurs building the future of agriculture.",
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/markrobinson",
      "twitter": "https://twitter.com/markrobinson"
    }
  },
  {
    "id": "2",
    "name": "John Doe",
    "investments": "200+",
    "industry": "Technology",
    "location": "Rwanda",
    "image": "https://s3-alpha-sig.figma.com/img/9e03/314b/6be949db4da5ca3cd5c60d680034189d?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=KejTan8a3l554QnDcf5GdIAhD3FHO7gf-nKHV8hFNTu6d9SlEdXrfrvu7RP0q5KIIs0i5pEt0Vy9XjI9dIl2Laj-eejkeMEwFevln8cIi-0YrMP~Ao-DolS11P-I3o4py1UHs1N7QsdbND1ddur~8IsLpGSs4~OFPoEfFVR2yDuFDAB4itLXeg~kxc22b3bESpu7ENsojT1HR-QKq9CDExJa-Rtm86qNLyW8DN4Bmq8pVYj6kI8g0KTV3OP-ICUEuVhuNFnpMhxTwavuejPricUfHIfXjXPnltpp-PhbgzdKOLxhJPndcqi0hQOX5v7HMJ6kfsgIq8ew42KEsFaP4A__",
    "bio": "Dedicated investor passionate about transforming the technology sector through innovation and strategic investments. I actively support technology-focused startups and businesses driving efficiency and growth in the technology industry. Looking to connect with visionary entrepreneurs building the future of technology.",
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/johndoe",
      "twitter": "https://twitter.com/johndoe"
    }
  },
  {
    "id": "3",
    "name": "Fred Jones",
    "investments": "180+",
    "industry": "Healthcare",
    "location": "Rwanda",
    "image": "https://s3-alpha-sig.figma.com/img/3cdd/da3a/2fda0394c1afc604611e0a2e0dcfb59e?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=lJ1gJ0vgi860iBrKiQL4ZDZ4kDbpoYSmpu59405XqhcLuUb-4yvDdIY6d5PiNtvemO6j7pfnnaWFMRmfosSWVVqv~ViNYc5oD6uKQM3k26Tbks6GZForVwqVDez2JVkuIggwPERKekxHxioAZOJsVYF75P4N-sXZDScFbqaAgqFUkxPisfnN3o5bDt7V2JpxCxq5xYO6qj~YPd0u66HIC-WzhO3N1I-U565ThuUCPOOT2mAOeDHQAU9kPi4ukZ09ApurarVqln824js8XfZXJxDTfICMmgjnGWqpa-1zMmBVPQYIzwjxUBZeq-hsoAWt3C-bAJm2yPGoXRDMmvg3ew__",
    "bio": "Dedicated investor passionate about transforming the healthcare sector through innovation and strategic investments. I actively support healthcare-focused startups and businesses driving efficiency and growth in the healthcare industry. Looking to connect with visionary entrepreneurs building the future of healthcare.",
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/fredjones",
      "twitter": "https://twitter.com/fredjones"
    }
  },
  {
    "id": "4",
    "name": "James Smith",
    "investments": "220+",
    "industry": "Real Estate",
    "location": "Rwanda",
    "image": "https://s3-alpha-sig.figma.com/img/e9a1/3591/c3d108ad4985871e6da26a9c79aee760?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=lwOyLyA2GzQvf7IJb44Bdw5lN7~Ay4cm-ShytMXm07fe-ugeecBTlovs7to6xzh1zLnd91zU2VBs2SyowN9PLoul1UFXlxNxrDnB~Vk2yV~U9S0BjSMtKfQlU4WKDWJjf7yutA5NIBcarymw9uFzAPARU-fNFxAhStPefR0mHgygcM8xIjoxhbejX2l~f-MXdy86FjZ9GARY9wLxXP3AF2tEKNADdQqOQ5cGqnV5OV-y6MApbhxlN~qwSpnFext-p8y9Ywem0IH8QuKTYm-YHSYmPQaURLwb8cWlK5colRtt60y~ZsooqCkG~WaLaNyHP~f47Hol7XbmuamOKi~Xjg__",
    "bio": "Dedicated investor passionate about transforming the real estate sector through innovation and strategic investments. I actively support real estate-focused startups and businesses driving efficiency and growth in the real estate industry. Looking to connect with visionary entrepreneurs building the future of real estate.",
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/jamessmith",
      "twitter": "https://twitter.com/jamessmith"
    }
  },
  {
    "id": "5",
    "name": "Emily Winner",
    "investments": "160+",
    "industry": "Finance",
    "location": "Germany",
    "image": "https://s3-alpha-sig.figma.com/img/f047/9482/198a71cefee106ee862131ff6c1c18ba?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=rkF71AKYJY1m4ipP-O8uXEkLpitfc1GdQdzHWJ4Hevy85Q0jv-ZhbLW4L3fmNPUurg2tTXiKK95mPKxXMt4GGtzIacUsThp5Xhg4mUKQKkfGSlLnqg1xXgWoE-v5b0R8QWe-S5wobfIcljhDXfuIREJgGYfciirQzBA5fGm8mTW7AkqzEZbBcjeAoX9ZYehzwwpCjZY1FYzkT1jLPA78km8CjGJnx9ext3L8h30hAsoh3UX8SS-k6IYxuJ62CqBEDJe3-pgEcL3XNbNp41WC5SQfml-0YRMhFJBqQAfkOjAfN4-5Apzhc1lH3KJKX5nsFn6D5-ypDw5htHdTjjNejA__",
    "bio": "Dedicated investor passionate about transforming the finance sector through innovation and strategic investments. I actively support finance-focused startups and businesses driving efficiency and growth in the finance industry. Looking to connect with visionary entrepreneurs building the future of finance.",
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/emilywinner",
      "twitter": "https://twitter.com/emilywinner"
    }
  },
  {
    "id": "6",
    "name": "Christopher Brown",
    "investments": "175+",
    "industry": "Retail",
    "location": "Rwanda",
    "image": "https://s3-alpha-sig.figma.com/img/6feb/39e0/4a8c69cd3b29f2c30d51ee546c840ab3?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=o6vSCi~GsW3DUmSE6PBxc8eNDaM7iU1c1Qkh6PQ8577d~gQCio5vVxinEBcIk2y4hGOYhDthQK1WL~sbxwZC5deni4X68ZT5Q0quD9BO0z~AlIY78QNdW9tatycZydWe8msxNZ54U4m0O~NsRYlP6amz0B5dxJm6DR0vtovSbeVp2g8ZUaqwMVbZMDxhvgTifCIuVUDh5-nfU0zV8v~QIgnUjuleou5Ctl6hMMJWCgHPixwq6OczyzFfTfZuTaTLcFO5Oj9QqHkfTEKBCHQSjJoTcMRMOztONiX7RUaeqbwq~e9BPgPzKqvRAUxcfnAoYFWLXSaTxbiU6w5SNPAPCw__",
    "bio": "Dedicated investor passionate about transforming the retail sector through innovation and strategic investments. I actively support retail-focused startups and businesses driving efficiency and growth in the retail industry. Looking to connect with visionary entrepreneurs building the future of retail.",
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/christopherbrown",
      "twitter": "https://twitter.com/christopherbrown"
    }
  },
  {
    "id": "7",
    "name": "Natalie Clark",
    "investments": "190+",
    "industry": "Energy",
    "location": "France",
    "image": "https://s3-alpha-sig.figma.com/img/fda4/40da/229fadba88e472f66bde56352d26177e?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=IDaBJ-JXvfIaMb5YRYsx1fnGN~-LTJdeOE5GM0POu1gjIWJFVu~qSm6r7a4HbfVuH3qjOOcA0kIIUXDC6aZXa3scol130pX902Bz0SfQ6qFLlE59v1weGkfQn9PgIrfyg5aNw~oIUzifC1h8xiU1VgMej0SM029JL4jMY40HCZwFYoV2F3f~kT7HMAZbMg8wYyTUSFgL1Ug0i1XYw37IH3q4MVd2YF94q58QHu4tcz4S60qvDIXv-722v6QIDyrXlAs-qpjoimpyMljm4LdOC4SxKCm1d2kLYSVWsk8VxpTdTcDdHpVWe15FvZAiY66C~esZN9YBl244oRf3O1PP1Q__",
    "bio": "Dedicated investor passionate about transforming the energy sector through innovation and strategic investments. I actively support energy-focused startups and businesses driving efficiency and growth in the energy industry. Looking to connect with visionary entrepreneurs building the future of energy.",
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/natalieclark",
      "twitter": "https://twitter.com/natalieclark"
    }
  },
  {
    "id": "8",
    "name": "Oliver White",
    "investments": "140+",
    "industry": "E-commerce",
    "location": "Europe",
    "image": "https://s3-alpha-sig.figma.com/img/e275/daf5/82ecef5d817bae62f4bb3bff9236fb5b?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QfiRry0W57vlxwnp7PqaR0eGBVAE6HI11QyjN88-JWEFNdjLowrTrYh29x8aaK1nJgNSubAjybCXxQADkwHAyUegsdDlOW7vDziaQkDYd05jcKjQTpvqgtFvFEdHOLcgUZuWyaUY96uJyEmXwZOk7H8c9c4t6REwYxidRedF7Zo4GYyU7DCsgUxHXMaN5~aP7JVqck-koXV8ClFu0-3XNxvpQZ1z2tdhDYIt56BbkI7lViv81Euc3Fe9vGVQoC~yABdxkr-f5lTuFtJMXHKAJUtwdhXsceQwc3u7kcRf~Dj3cimKzW80Sl4HY3AEjrc93AQbUbtttfEiaSM3LfpOaQ__",
    "bio": "Dedicated investor passionate about transforming the e-commerce sector through innovation and strategic investments. I actively support e-commerce-focused startups and businesses driving efficiency and growth in the e-commerce industry. Looking to connect with visionary entrepreneurs building the future of e-commerce.",
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/oliverwhite",
      "twitter": "https://twitter.com/oliverwhite"
    }
  },
  {
    "id": "9",
    "name": "Sophia Carter",
    "investments": "250+",
    "industry": "Biotech",
    "location": "Singapore",
    "image": "./images/sophia_carter.jpg",
    "bio": "Dedicated investor passionate about transforming the biotech sector through innovation and strategic investments. I actively support biotech-focused startups and businesses driving efficiency and growth in the biotech industry. Looking to connect with visionary entrepreneurs building the future of biotech.",
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/sophiacarter",
      "twitter": "https://twitter.com/sophiacarter"
    }
  },
  {
    "id": "10",
    "name": "Henry Adams",
    "investments": "130+",
    "industry": "Education",
    "location": "South Africa",
    "image": "./images/henry_adams.jpg",
    "bio": "Dedicated investor passionate about transforming the education sector through innovation and strategic investments. I actively support education-focused startups and businesses driving efficiency and growth in the education industry. Looking to connect with visionary entrepreneurs building the future of education.",
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/henryadams",
      "twitter": "https://twitter.com/henryadams"
    }
  },
  {
    "id": "11",
    "name": "Lucas Thompson",
    "investments": "210+",
    "industry": "Automotive",
    "location": "Europe",
    "image": "https://s3-alpha-sig.figma.com/img/fda4/40da/229fadba88e472f66bde56352d26177e?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=IDaBJ-JXvfIaMb5YRYsx1fnGN~-LTJdeOE5GM0POu1gjIWJFVu~qSm6r7a4HbfVuH3qjOOcA0kIIUXDC6aZXa3scol130pX902Bz0SfQ6qFLlE59v1weGkfQn9PgIrfyg5aNw~oIUzifC1h8xiU1VgMej0SM029JL4jMY40HCZwFYoV2F3f~kT7HMAZbMg8wYyTUSFgL1Ug0i1XYw37IH3q4MVd2YF94q58QHu4tcz4S60qvDIXv-722v6QIDyrXlAs-qpjoimpyMljm4LdOC4SxKCm1d2kLYSVWsk8VxpTdTcDdHpVWe15FvZAiY66C~esZN9YBl244oRf3O1PP1Q__",
    "bio": "Dedicated investor passionate about transforming the automotive sector through innovation and strategic investments. I actively support automotive-focused startups and businesses driving efficiency and growth in the automotive industry. Looking to connect with visionary entrepreneurs building the future of automotive.",
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/lucasthompson",
      "twitter": "https://twitter.com/lucasthompson"
    }
  },
  {
    "id": "12",
    "name": "Grace Wilson",
    "investments": "270+",
    "industry": "Pharmaceuticals",
    "location": "Italy",
    "image": "./images/grace_wilson.jpg",
    "bio": "Dedicated investor passionate about transforming the pharmaceuticals sector through innovation and strategic investments. I actively support pharmaceuticals-focused startups and businesses driving efficiency and growth in the pharmaceuticals industry. Looking to connect with visionary entrepreneurs building the future of pharmaceuticals.",
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/gracewilson",
      "twitter": "https://twitter.com/gracewilson"
    }
  },
  {
    "id": "13",
    "name": "Ethan Johnson",
    "investments": "190+",
    "industry": "Fashion",
    "location": "Brazil",
    "image": "./images/ethan_johnson.jpg",
    "bio": "Dedicated investor passionate about transforming the fashion sector through innovation and strategic investments. I actively support fashion-focused startups and businesses driving efficiency and growth in the fashion industry. Looking to connect with visionary entrepreneurs building the future of fashion.",
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/ethanjohnson",
      "twitter": "https://twitter.com/ethanjohnson"
    }
  },
  {
    "id": "14",
    "name": "Ava Miller",
    "investments": "160+",
    "industry": "Media",
    "location": "UAE",
    "image": "https://s3-alpha-sig.figma.com/img/e275/daf5/82ecef5d817bae62f4bb3bff9236fb5b?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QfiRry0W57vlxwnp7PqaR0eGBVAE6HI11QyjN88-JWEFNdjLowrTrYh29x8aaK1nJgNSubAjybCXxQADkwHAyUegsdDlOW7vDziaQkDYd05jcKjQTpvqgtFvFEdHOLcgUZuWyaUY96uJyEmXwZOk7H8c9c4t6REwYxidRedF7Zo4GYyU7DCsgUxHXMaN5~aP7JVqck-koXV8ClFu0-3XNxvpQZ1z2tdhDYIt56BbkI7lViv81Euc3Fe9vGVQoC~yABdxkr-f5lTuFtJMXHKAJUtwdhXsceQwc3u7kcRf~Dj3cimKzW80Sl4HY3AEjrc93AQbUbtttfEiaSM3LfpOaQ__",
    "bio": "Dedicated investor passionate about transforming the media sector through innovation and strategic investments. I actively support media-focused startups and businesses driving efficiency and growth in the media industry. Looking to connect with visionary entrepreneurs building the future of media.",
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/avamiller",
      "twitter": "https://twitter.com/avamiller"
    }
  },
  {
    "id": "15",
    "name": "Michael Garcia",
    "investments": "140+",
    "industry": "AI & Robotics",
    "location": "China",
    "image": "./images/michael_garcia.jpg",
    "bio": "Dedicated investor passionate about transforming the ai & robotics sector through innovation and strategic investments. I actively support ai & robotics-focused startups and businesses driving efficiency and growth in the ai & robotics industry. Looking to connect with visionary entrepreneurs building the future of ai & robotics.",
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/michaelgarcia",
      "twitter": "https://twitter.com/michaelgarcia"
    }
  },
  {
    "id": "16",
    "name": "William Harris",
    "investments": "230+",
    "industry": "Blockchain",
    "location": "Netherlands",
    "image": "./images/william_harris.jpg",
    "bio": "Dedicated investor passionate about transforming the blockchain sector through innovation and strategic investments. I actively support blockchain-focused startups and businesses driving efficiency and growth in the blockchain industry. Looking to connect with visionary entrepreneurs building the future of blockchain.",
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/williamharris",
      "twitter": "https://twitter.com/williamharris"
    }
  },
  {
    "id": "17",
    "name": "Charlotte Anderson",
    "investments": "170+",
    "industry": "Cybersecurity",
    "location": "Sweden",
    "image": "./images/charlotte_anderson.jpg",
    "bio": "Dedicated investor passionate about transforming the cybersecurity sector through innovation and strategic investments. I actively support cybersecurity-focused startups and businesses driving efficiency and growth in the cybersecurity industry. Looking to connect with visionary entrepreneurs building the future of cybersecurity.",
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/charlotteanderson",
      "twitter": "https://twitter.com/charlotteanderson"
    }
  },
  {
    "id": "18",
    "name": "Daniel Martinez",
    "investments": "200+",
    "industry": "Cloud Computing",
    "location": "South Korea",
    "image": "./images/daniel_martinez.jpg",
    "bio": "Dedicated investor passionate about transforming the cloud computing sector through innovation and strategic investments. I actively support cloud computing-focused startups and businesses driving efficiency and growth in the cloud computing industry. Looking to connect with visionary entrepreneurs building the future of cloud computing.",
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/danielmartinez",
      "twitter": "https://twitter.com/danielmartinez"
    }
  },
  {
    "id": "19",
    "name": "Mia Rodriguez",
    "investments": "220+",
    "industry": "Logistics",
    "location": "Spain",
    "image": "./images/mia_rodriguez.jpg",
    "bio": "Dedicated investor passionate about transforming the logistics sector through innovation and strategic investments. I actively support logistics-focused startups and businesses driving efficiency and growth in the logistics industry. Looking to connect with visionary entrepreneurs building the future of logistics.",
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/miarodriguez",
      "twitter": "https://twitter.com/miarodriguez"
    }
  },
  {
    "id": "20",
    "name": "Benjamin Lee",
    "investments": "280+",
    "industry": "Gaming",
    "location": "Russia",
    "image": "./images/benjamin_lee.jpg",
    "bio": "Dedicated investor passionate about transforming the gaming sector through innovation and strategic investments. I actively support gaming-focused startups and businesses driving efficiency and growth in the gaming industry. Looking to connect with visionary entrepreneurs building the future of gaming.",
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/benjaminlee",
      "twitter": "https://twitter.com/benjaminlee"
    }
  },
  {
    "id": "21",
    "name": "Elijah King",
    "investments": "135+",
    "industry": "Telecommunications",
    "location": "Nigeria",
    "image": "./images/elijah_king.jpg",
    "bio": "Dedicated investor passionate about transforming the telecommunications sector through innovation and strategic investments. I actively support telecommunications-focused startups and businesses driving efficiency and growth in the telecommunications industry. Looking to connect with visionary entrepreneurs building the future of telecommunications.",
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/elijahking",
      "twitter": "https://twitter.com/elijahking"
    }
  },
  {
    "id": "22",
    "name": "Harper Scott",
    "investments": "195+",
    "industry": "Food & Beverage",
    "location": "Mexico",
    "image": "./images/harper_scott.jpg",
    "bio": "Dedicated investor passionate about transforming the food & beverage sector through innovation and strategic investments. I actively support food & beverage-focused startups and businesses driving efficiency and growth in the food & beverage industry. Looking to connect with visionary entrepreneurs building the future of food & beverage.",
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/harperscott",
      "twitter": "https://twitter.com/harperscott"
    }
  },
  {
    "id": "23",
    "name": "David Young",
    "investments": "170+",
    "industry": "Aerospace",
    "location": "Turkey",
    "image": "./images/david_young.jpg",
    "bio": "Dedicated investor passionate about transforming the aerospace sector through innovation and strategic investments. I actively support aerospace-focused startups and businesses driving efficiency and growth in the aerospace industry. Looking to connect with visionary entrepreneurs building the future of aerospace.",
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/davidyoung",
      "twitter": "https://twitter.com/davidyoung"
    }
  },
  {
    "id": "24",
    "name": "Ella Turner",
    "investments": "155+",
    "industry": "Tourism",
    "location": "Thailand",
    "image": "./images/ella_turner.jpg",
    "bio": "Dedicated investor passionate about transforming the tourism sector through innovation and strategic investments. I actively support tourism-focused startups and businesses driving efficiency and growth in the tourism industry. Looking to connect with visionary entrepreneurs building the future of tourism.",
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/ellaturner",
      "twitter": "https://twitter.com/ellaturner"
    }
  },
  {
    "id": "25",
    "name": "Jack Hall",
    "investments": "145+",
    "industry": "Agritech",
    "location": "Kenya",
    "image": "./images/jack_hall.jpg",
    "bio": "Dedicated investor passionate about transforming the agritech sector through innovation and strategic investments. I actively support agritech-focused startups and businesses driving efficiency and growth in the agritech industry. Looking to connect with visionary entrepreneurs building the future of agritech.",
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/jackhall",
      "twitter": "https://twitter.com/jackhall"
    }
  },
  {
    "id": "26",
    "name": "Amelia Lewis",
    "investments": "250+",
    "industry": "Fintech",
    "location": "Poland",
    "image": "./images/amelia_lewis.jpg",
    "bio": "Dedicated investor passionate about transforming the fintech sector through innovation and strategic investments. I actively support fintech-focused startups and businesses driving efficiency and growth in the fintech industry. Looking to connect with visionary entrepreneurs building the future of fintech.",
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/amelialewis",
      "twitter": "https://twitter.com/amelialewis"
    }
  },
  {
    "id": "27",
    "name": "Matthew Allen",
    "investments": "200+",
    "industry": "Streaming Services",
    "location": "Malaysia",
    "image": "./images/matthew_allen.jpg",
    "bio": "Dedicated investor passionate about transforming the streaming services sector through innovation and strategic investments. I actively support streaming services-focused startups and businesses driving efficiency and growth in the streaming services industry. Looking to connect with visionary entrepreneurs building the future of streaming services.",
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/matthewallen",
      "twitter": "https://twitter.com/matthewallen"
    }
  },
  {
    "id": "28",
    "name": "Lily Walker",
    "investments": "275+",
    "industry": "Insurance",
    "location": "Switzerland",
    "image": "./images/lily_walker.jpg",
    "bio": "Dedicated investor passionate about transforming the insurance sector through innovation and strategic investments. I actively support insurance-focused startups and businesses driving efficiency and growth in the insurance industry. Looking to connect with visionary entrepreneurs building the future of insurance.",
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/lilywalker",
      "twitter": "https://twitter.com/lilywalker"
    }
  },
  {
    "id": "29",
    "name": "Nathan Perez",
    "investments": "180+",
    "industry": "Bioengineering",
    "location": "Argentina",
    "image": "./images/nathan_perez.jpg",
    "bio": "Dedicated investor passionate about transforming the bioengineering sector through innovation and strategic investments. I actively support bioengineering-focused startups and businesses driving efficiency and growth in the bioengineering industry. Looking to connect with visionary entrepreneurs building the future of bioengineering.",
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/nathanperez",
      "twitter": "https://twitter.com/nathanperez"
    }
  },
  {
    "id": "30",
    "name": "Hannah Wright",
    "investments": "240+",
    "industry": "Crypto",
    "location": "Philippines",
    "image": "./images/hannah_wright.jpg",
    "bio": "Dedicated investor passionate about transforming the crypto sector through innovation and strategic investments. I actively support crypto-focused startups and businesses driving efficiency and growth in the crypto industry. Looking to connect with visionary entrepreneurs building the future of crypto.",
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/hannahwright",
      "twitter": "https://twitter.com/hannahwright"
    }
  }
]

const continentMapping: Record<string, string[]> = {
  "Africa": ["Rwanda", "South Africa", "Kenya", "Nigeria"],
  "Europe": ["Germany", "France", "Italy", "Netherlands", "Sweden", "Switzerland", "Poland", "Russia", "Spain", "Turkey"],
  "America": ["Brazil", "Mexico", "Argentina", "United States", "Canada"],
  "Asia": ["Singapore", "China", "South Korea", "UAE", "Thailand", "Malaysia", "Philippines"]
}


// Region filter options
const regionsData: Region[] = [
  { id: "1", name: "All", active: true },
  { id: "2", name: "Rwanda", active: false },
  { id: "3", name: "Africa", active: false },
  { id: "4", name: "Europe", active: false },
  { id: "5", name: "America", active: false },
  { id: "6", name: "Asia", active: false },
]

// Sector filter options
const sectorsData: FilterOption[] = [
  { id: "1", name: "Agriculture" },
  { id: "2", name: "Technology" },
  { id: "3", name: "Healthcare" },
  { id: "4", name: "Finance" },
  { id: "5", name: "Education" },
]

// Sort options
export const sortOptionsData: SortOption[] = [
  { id: "nameAsc", name: "Name (A-Z)", field: "name", direction: "asc" },
  { id: "nameDesc", name: "Name (Z-A)", field: "name", direction: "desc" },
  { id: "locationAsc", name: "Location (A-Z)", field: "location", direction: "asc" },
  { id: "locationDesc", name: "Location (Z-A)", field: "location", direction: "desc" },
  { id: "industryAsc", name: "Industry (A-Z)", field: "industry", direction: "asc" },
  { id: "industryDesc", name: "Industry (Z-A)", field: "industry", direction: "desc" },
]

// Improved delay function with timeout and error handling
const delay = (ms: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      clearTimeout(timeout)
      resolve()
    }, ms)
    
    // Simulate occasional network errors (1% chance)
    if (Math.random() < 0.01) {
      clearTimeout(timeout)
      reject(new Error("Network request failed"))
    }
  })
}

/**
 * Fetch investors with filtering, sorting, and search capabilities
 */
export const fetchInvestors = async (
  region?: string,
  sector?: string,
  sortOptionId?: string | null,
  searchQuery?: string,
): Promise<Investor[]> => {
  try {
    await delay(800) // Simulate network delay

    let filteredInvestors = [...investorsData]

    // Apply region filter with continent support
    if (region && region !== "All") {
      if (Object.keys(continentMapping).includes(region)) {
        // If region is a continent, include all countries in that continent
        const countriesInContinent = continentMapping[region]
        filteredInvestors = filteredInvestors.filter(
          investor => countriesInContinent.includes(investor.location) || investor.location === region
        )
      } else {
        // If region is a specific country
        filteredInvestors = filteredInvestors.filter(investor => investor.location === region)
      }
    }

    // Apply sector filter
    if (sector) {
      filteredInvestors = filteredInvestors.filter(investor => investor.industry === sector)
    }

    // Apply search query - improved to search across multiple fields
    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim()
      filteredInvestors = filteredInvestors.filter(investor => {
        return (
          investor.name.toLowerCase().includes(query) ||
          investor.industry.toLowerCase().includes(query) ||
          investor.location.toLowerCase().includes(query) ||
          investor.investments.toLowerCase().includes(query)
        )
      })
    }

    // Apply sorting
    if (sortOptionId) {
      const sortOption = sortOptionsData.find(option => option.id === sortOptionId)
      if (sortOption) {
        const { field, direction } = sortOption
        filteredInvestors.sort((a, b) => {
          const valueA = a[field as keyof Investor] || ''
          const valueB = b[field as keyof Investor] || ''

          if (direction === "asc") {
            return String(valueA).localeCompare(String(valueB))
          } else {
            return String(valueB).localeCompare(String(valueA))
          }
        })
      }
    }

    return filteredInvestors
  } catch (error) {
    console.error("Error fetching investors:", error)
    throw error
  }
}

/**
 * Fetch available regions
 */
export const fetchRegions = async (): Promise<Region[]> => {
  try {
    await delay(500)
    return regionsData
  } catch (error) {
    console.error("Error fetching regions:", error)
    throw error
  }
}

/**
 * Fetch available sectors
 */
export const fetchSectors = async (): Promise<FilterOption[]> => {
  try {
    await delay(500)
    return sectorsData
  } catch (error) {
    console.error("Error fetching sectors:", error)
    throw error
  }
}

/**
 * Fetch available sort options
 */
export const fetchSortOptions = async (): Promise<SortOption[]> => {
  try {
    await delay(300)
    return sortOptionsData
  } catch (error) {
    console.error("Error fetching sort options:", error)
    throw error
  }
}

/**
 * Fetch statistics data
 */
export const fetchStats = async (): Promise<{
  visitors: string
  visitorsChange: string
  visitorsIncreasing: boolean
  newInvestors: string
  newInvestorsChange: string
  newInvestorsIncreasing: boolean
}> => {
  try {
    await delay(600)
    return {
      visitors: "14,254",
      visitorsChange: "1.5%",
      visitorsIncreasing: false,
      newInvestors: "100+",
      newInvestorsChange: "1.3%",
      newInvestorsIncreasing: true,
    }
  } catch (error) {
    console.error("Error fetching stats:", error)
    throw error
  }
}


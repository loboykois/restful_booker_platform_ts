const noRooms = {
  rooms: [],
};

const singleRoom = {
  rooms: [
    {
      roomid: 1,
      roomName: "101",
      type: "single",
      accessible: true,
      image: "https://www.mwtestconsultancy.co.uk/img/testim/room2.jpg",
      description:
        "Aenean porttitor mauris sit amet lacinia molestie. In posuere accumsan aliquet. Maecenas sit amet nisl massa. Interdum et malesuada fames ac ante.",
      features: ["TV", "WiFi", "Safe"],
      roomPrice: 100,
    },
  ],
};

const twinRoom = {
  rooms: [
    {
      roomid: 2,
      roomName: "102",
      type: "Twin",
      accessible: false,
      image: "https://www.mwtestconsultancy.co.uk/img/room1.jpg",
      description: "Please enter a description for this room",
      features: ["WiFi", "TV", "Radio", "Refreshments", "Safe", "Views"],
      roomPrice: 200,
    },
  ],
};

const doubleRoom = {
  rooms: [
    {
      roomid: 3,
      roomName: "103",
      type: "Double",
      accessible: true,
      image: "https://www.mwtestconsultancy.co.uk/img/room1.jpg",
      description: "Please enter a description for this room",
      features: [],
      roomPrice: 250,
    },
  ],
};

const familyRoom = {
  rooms: [
    {
      roomid: 4,
      roomName: "104",
      type: "Family",
      accessible: false,
      image: "https://www.mwtestconsultancy.co.uk/img/room1.jpg",
      description: "Please enter a description for this room",
      features: ["Radio", "Views"],
      roomPrice: 350,
    },
  ],
};

const suiteRoom = {
  rooms: [
    {
      roomid: 5,
      roomName: "105",
      type: "Suite",
      accessible: true,
      image: "https://www.mwtestconsultancy.co.uk/img/room1.jpg",
      description: "Please enter a description for this room",
      features: [],
      roomPrice: 400,
    },
  ],
};

export const fakeResponses = {
  noRooms,
  singleRoom,
  twinRoom,
  doubleRoom,
  familyRoom,
  suiteRoom,
};

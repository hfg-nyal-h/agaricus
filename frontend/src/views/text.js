[
  [
    {
      _id: "61eabad83471958318a57942",
      sensorId: "a105c727-a593-459c-b647-71c08ec6a170",
      sensorUser: "luca",
      val: 67,
      createdAt: "2022-01-21T13:53:28.469Z",
      modifiedAt: "2022-01-21T13:53:28.469Z",
    },
    {
      _id: "61eabace3471958318a57941",
      sensorId: "a105c727-a593-459c-b647-71c08ec6a170",
      sensorUser: "luca",
      val: 65,
      createdAt: "2022-01-21T13:53:18.475Z",
      modifiedAt: "2022-01-21T13:53:18.475Z",
    },
    {
      _id: "61eabac43471958318a57940",
      sensorId: "a105c727-a593-459c-b647-71c08ec6a170",
      sensorUser: "luca",
      val: 65,
      createdAt: "2022-01-21T13:53:08.488Z",
      modifiedAt: "2022-01-21T13:53:08.488Z",
    },
    {
      _id: "61eababa3471958318a5793f",
      sensorId: "a105c727-a593-459c-b647-71c08ec6a170",
      sensorUser: "luca",
      val: 65,
      createdAt: "2022-01-21T13:52:58.468Z",
      modifiedAt: "2022-01-21T13:52:58.468Z",
    },
    {
      _id: "61eabab03471958318a5793e",
      sensorId: "a105c727-a593-459c-b647-71c08ec6a170",
      sensorUser: "luca",
      val: 65,
      createdAt: "2022-01-21T13:52:48.458Z",
      modifiedAt: "2022-01-21T13:52:48.458Z",
    },
  ],
  [
    {
      _id: "61df43c49e0a7f80abb621f5",
      sensorId: "dfe73371-a368-473d-a6dd-16eaa361505c",
      sensorUser: "luca",
      val: 61,
      createdAt: "2022-01-12T21:10:28.716Z",
      modifiedAt: "2022-01-12T21:10:28.716Z",
    },
    {
      _id: "61df43ba9e0a7f80abb621f3",
      sensorId: "dfe73371-a368-473d-a6dd-16eaa361505c",
      sensorUser: "luca",
      val: 59,
      createdAt: "2022-01-12T21:10:18.708Z",
      modifiedAt: "2022-01-12T21:10:18.708Z",
    },
    {
      _id: "61df43b09e0a7f80abb621f1",
      sensorId: "dfe73371-a368-473d-a6dd-16eaa361505c",
      sensorUser: "luca",
      val: 59,
      createdAt: "2022-01-12T21:10:08.653Z",
      modifiedAt: "2022-01-12T21:10:08.653Z",
    },
    {
      _id: "61df43a69e0a7f80abb621ef",
      sensorId: "dfe73371-a368-473d-a6dd-16eaa361505c",
      sensorUser: "luca",
      val: 59,
      createdAt: "2022-01-12T21:09:58.638Z",
      modifiedAt: "2022-01-12T21:09:58.638Z",
    },
    {
      _id: "61df439c9e0a7f80abb621ed",
      sensorId: "dfe73371-a368-473d-a6dd-16eaa361505c",
      sensorUser: "luca",
      val: 59,
      createdAt: "2022-01-12T21:09:48.500Z",
      modifiedAt: "2022-01-12T21:09:48.500Z",
    },
  ],
];

<div class="row">
<div
  v-for="(mySensor, index) in mySensors"
  :key="mySensor"
  class="col-lg-6"
>
  <h4>
    <b>{{ ++index }}. sensor</b>
  </h4>
  <!-- add Sensorname -->
  <hr />
  <b>moisture</b> {{ mySensor[0].val }}% | <br />
  <!-- das selbe wie {{mySensors[index][0].val}} -->
  <b>sensor id:</b> {{ mySensor[0].sensorId }} | <br />
  <b>sensor in use since:</b> {{ mySensor[0].createdAt }} <br />
 <!--  <apexCharts :mySensors="mySensor" /> -->
</div>
export let routes = [
  {
    path: "/#home",
    component: `<todo-el> </todo-el>
                <todo-list> </todo-list>`,
    label: `home-route`
  },
  {
    path: "/#away",
    component: `<todo-list> </todo-list> `,
    label: `away-route`
  }
];

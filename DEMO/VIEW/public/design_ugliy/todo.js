const template = `
  <li>{{ todoone.text }}</li>
`;
export default {
  props: {
    todoone: {}
  },
  template: template
}

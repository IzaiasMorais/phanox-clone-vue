export default {
  data() {
    return {
      produtos: null,
      produtosPerPage: 10,
      produtosTotal: 1,
    };
  },
  methods: {
    getProducts() {
      api.get(this.url).then((response) => {
        this.produtosTotal = Number(response.headers["x-total-count"]);
        this.produtos = response.data;
      });
    },
  }
}
<script context="module">
  export async function load({ session }) {
    if (session.authenticated) {
      return {
        status: 302,
        redirect: "/home/me",
      };
    } else {
      return {
        status: 302,
        redirect: "/login",
      };
    }
  }
</script>

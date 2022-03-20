<script context="module">
  export async function load({ session }) {
    if (!session.authenticated) {
      return {
        status: 302,
        redirect: "/login",
      };
    }
    return {
      status: 302,
      redirect: "/home/me",
    };
  }
</script>

<script lang="ts">
  import { SigninForm } from "@faivform/builtin";
</script>

<SigninForm
  submit={async () => {
    console.log("submit");
  }}
/>

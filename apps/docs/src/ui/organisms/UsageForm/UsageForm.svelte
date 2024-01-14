<script lang="ts">
  import { faivform, Field, Errors } from "@tuentyfaiv/svelte-form";
  // import { string, boolean } from "yup";
  import type { FieldsSchema } from "@tuentyfaiv/svelte-form";

  // type FormFiels = {
  //   name: string;
  //   message: string;
  //   accept: boolean;
  //   some: {
  //     errors: {
  //       first: string;
  //     };
  //   };
  //   asda: number;
  //   other: string;
  //   users: string[];
  // }

  // const fields = {
  //   name: /^[a-zA-Z]+$/,
  //   message: "string",
  //   accept: "boolean",
  //   some: {
  //     errors: {
  //       first: "string",
  //     },
  //   },
  //   asda: {
  //     type: "number",
  //     min: 24,
  //     max: 10,
  //     required: true,
  //   },
  //   other: {
  //     type: /asda/,
  //     min: 5,
  //     required: true,
  //   },
  //   avatars: {
  //     type: "array",
  //     item: {
  //       type: "string",
  //       min: 4,
  //     },
  //   },
  //   users: {
  //     type: "array",
  //     item: {
  //       email: {
  //         type: "string",
  //         required: true,
  //       },
  //       username: {
  //         type: "string",
  //         required: true,
  //       },
  //       active: "boolean",
  //       age: "number",
  //       details: "string",
  //     },
  //   },
  // } satisfies FieldsSchema;

  const schema = {
    name: /^[a-zA-Z]+$/,
    message: "string",
    accept: "boolean",
    some: {
      errors: {
        first: "string",
      },
    },
    asda: {
      type: "number",
      min: 24,
      max: 10,
      required: true,
    },
    other: {
      type: /asda/,
      min: 5,
      required: true,
    },
    avatars: {
      type: "array",
      item: {
        type: "string",
        min: 4,
      },
    },
    users: {
      type: "array",
      item: {
        email: {
          type: "string",
          required: true,
        },
        username: {
          type: "string",
          required: true,
        },
        active: "boolean",
        age: "number",
        details: "string",
      },
    },
    deepArrays: {
      type: "array",
      item: {
        type: "array",
        item: {
          type: "array",
          item: {
            type: "array",
            item: {
              type: "number",
              required: true,
            },
          },
        },
      },
    },
    dates: {
      type: "array",
      item: {
        type: "array",
        item: {
          type: "date",
          required: true,
        },
      },
    },
  } satisfies FieldsSchema;

  // const fields = adapter(schema);

  const form = faivform({
    // fields: schema,
    fields: schema,
  });

  const {
    data,
    errors,
    loading,
    // styles,
    submit,
    // check,
    // reset,
    // setError,
    setField,
  } = $form;

  const onSubmit = submit(async (values) => {
    alert(JSON.stringify(values, null, 2));
  });

  $: {
    setField("accept", false);
  }
</script>

<div class="usage-example">
  <div class="usage-example__internal">
    <div class="usage-example__code">
      <pre>
      <code>
        {JSON.stringify(schema, null, 2)}
      </code>
    </pre>
    </div>
    <div class="usage-example__code">
      <pre>
      <code>
        {JSON.stringify($data, null, 2)}
      </code>
    </pre>
    </div>
    <div class="usage-example__code">
      <pre>
      <code>
        {JSON.stringify($errors, null, 2)}
      </code>
    </pre>
    </div>
  </div>
  <form on:submit|preventDefault={onSubmit}>
    <Field name="name" label="Name:" />
    <Field name="message" label="Leave a message:" type="textarea" />
    <Field name="accept" label="Accept terms:" type="checkbox" />
    <button type="submit">
      {$loading ? "Loading..." : "Submit"}
    </button>
  </form>
  <Errors />
</div>

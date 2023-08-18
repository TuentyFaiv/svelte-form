<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { generateDatas } from "$lib/logic/utils/objects.js";
  import { useForm } from "$lib/logic/stores/form.js";
  import { getStyle } from "$lib/logic/utils/styles.js";

  import type { Input, Props } from "./File.proptypes.js";

  export let name: Props["name"];
  export let context: Props["context"] = "form";
  export let id: Props["id"] = null;
  export let alt: Props["alt"] = null;
  export let multiple: Props["multiple"] = false;
  export let accept: Props["accept"] = "image/*";
  export let defaultValue: Props["defaultValue"] = "";
  export let max: Props["max"] = Infinity;
  export let datas: Props["datas"] = {};

  let input: Input;

  const dispatch = createEventDispatcher<{
    choose: File | File[];
    retry: undefined;
  }>();
  const form = useForm(context);
  const { data, errors, styles: ctxStyles, setField, setError } = $form;
  $: ({ file: styles, replace } = $ctxStyles);

  $: file = !!$data[name] ? ($data[name] as File) : null;
  $: files = !!$data[name] ? ($data[name] as File[]) : null;

  $: image = {
    src: file ? URL.createObjectURL(file) : defaultValue,
    alt: file ? file.name : alt ?? name,
  };

  $: datasets = generateDatas(datas);

  $: wrapperStyle = getStyle({
    replace,
    style: "svform-wrapper",
    external: styles?.wrapper,
  });
  $: actionsStyle = getStyle({
    replace,
    style: "svform-actions",
    external: styles?.actions,
  });
  $: errorStyle = getStyle({
    replace,
    style: "svform-error",
    external: styles?.error,
  });
  $: retryStyle = getStyle({
    replace,
    style: "svform-retry",
    external: styles?.retry,
  });
  $: fieldStyle = getStyle({
    replace,
    style: "svform-field",
    external: styles?.field,
  });
  $: inputStyle = getStyle({
    replace,
    style: "svform-input",
    external: styles?.input,
  });

  function onSelectFile(event: Event) {
    const { files: filesInput } = event.target as HTMLInputElement;
    if (filesInput) {
      const filesToUpload =
        multiple && files
          ? ([...files, ...filesInput] as File[])
          : filesInput[0];

      if (filesToUpload instanceof File || Array.isArray(filesToUpload)) {
        const sizeKB =
          (filesToUpload instanceof File
            ? filesToUpload.size
            : filesToUpload.reduce(
                (acc, fileToUpload) => acc + fileToUpload.size,
                0
              )) / 1024;
        if (sizeKB > max) {
          setError(name, "to-big");
        }
      }

      setField(name, filesToUpload);
      dispatch("choose", filesToUpload);
    }
  }

  function onClear() {
    setField(name, undefined);
    if (input) input.value = "";
  }

  onMount(() => {
    onClear();
    return () => {
      onClear();
    };
  });
</script>

<div class={wrapperStyle} {...datasets}>
  {#if $$slots.out}
    <slot name="out" {image} />
  {/if}
  {#if $$slots.actions && !$errors[name] && !!$data[name]}
    <slot name="actions" {image} {onClear} />
  {/if}
  {#if $errors[name]}
    <div class={actionsStyle}>
      <span class={errorStyle}>
        <slot name="error" error={$errors[name]}>
          {$errors[name]}
        </slot>
      </span>
      <button
        type="button"
        class={retryStyle}
        on:click|stopPropagation={() => {
          dispatch("retry");
          onClear();
        }}
      >
        <slot name="retry" />
      </button>
    </div>
  {/if}
  <label for={id ?? name} class={fieldStyle}>
    {#if !$data[name]}
      <slot name="activate" {image} />
    {/if}
    <input
      bind:this={input}
      id={id ?? name}
      class={inputStyle}
      type="file"
      {accept}
      on:change={onSelectFile}
      {name}
      {...$$restProps}
    />
  </label>
</div>

<style>
  /* .svform-wrapper {
  } */
  /* .svform-actions {
  } */
  /* .svform-error {
  } */
  /* .svform-retry {
  } */
  /* .svform-field {
  } */
  /* .svform-input {
  } */
</style>

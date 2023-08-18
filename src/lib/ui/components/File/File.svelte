<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { generateDatas } from "$lib/logic/utils/objects.js";
  import { useForm } from "$lib/logic/stores/form.js";

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
  $: ({ file: styles } = $ctxStyles);

  $: file = !!$data[name] ? ($data[name] as File) : null;
  $: files = !!$data[name] ? ($data[name] as File[]) : null;

  $: image = {
    src: file ? URL.createObjectURL(file) : defaultValue,
    alt: file ? file.name : alt ?? name,
  };

  $: datasets = generateDatas(datas);

  $: externalWrapperStyles = styles?.wrapper ? ` ${styles.wrapper}` : "";
  $: externalActionsStyles = styles?.actions ? ` ${styles.actions}` : "";
  $: externalErrorStyles = styles?.error ? ` ${styles.error}` : "";
  $: externalRetryStyles = styles?.retry ? ` ${styles.retry}` : "";
  $: externalFieldStyles = styles?.field ? ` ${styles.field}` : "";
  $: externalInputStyles = styles?.input ? ` ${styles.input}` : "";

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

<div class="wrapper{externalWrapperStyles}" {...datasets}>
  {#if $$slots.out}
    <slot name="out" {image} />
  {/if}
  {#if $$slots.actions && !$errors[name] && !!$data[name]}
    <slot name="actions" {image} {onClear} />
  {/if}
  {#if $errors[name]}
    <div class="actions{externalActionsStyles}">
      <span class="errot{externalErrorStyles}">
        <slot name="error" error={$errors[name]}>
          {$errors[name]}
        </slot>
      </span>
      <button
        type="button"
        class="retry{externalRetryStyles}"
        on:click|stopPropagation={() => {
          dispatch("retry");
          onClear();
        }}
      >
        <slot name="retry" />
      </button>
    </div>
  {/if}
  <label for={id ?? name} class="field{externalFieldStyles}">
    {#if !$data[name]}
      <slot name="activate" {image} />
    {/if}
    <input
      bind:this={input}
      id={id ?? name}
      class="input{externalInputStyles}"
      type="file"
      {accept}
      on:change={onSelectFile}
      {name}
      {...$$restProps}
    />
  </label>
</div>

<style>
  .wrapper {
  }
  .actions {
  }
  .error {
  }
  .retry {
  }
  .field {
  }
  .input {
  }
</style>

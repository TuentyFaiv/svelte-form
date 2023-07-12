<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { generateDatas } from "$lib/logic/utils/objects.js";
  import { useForm } from "$lib/logic/stores/form.js";

  import type { Input, Props } from "./File.proptypes.js";

  import * as stylesinternal from "./File.styles.js";

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

  const form = useForm(context);
  const { data, errors, styles: ctxStyles, setField, setError } = $form;
  const dispatch = createEventDispatcher<{
    choose: File | File[];
    retry: undefined;
  }>();
  $: ({ file: styles } = $ctxStyles);

  $: file = !!$data[name] ? ($data[name] as File) : null;
  $: files = !!$data[name] ? ($data[name] as File[]) : null;

  $: image = {
    src: file ? URL.createObjectURL(file) : defaultValue,
    alt: file ? file.name : alt ?? name,
  };

  $: datasets = generateDatas(datas);

  function onSelectFile(event: Event) {
    const { files: filesToUpload } = event.target as HTMLInputElement;
    if (filesToUpload) {
      const fileToUpload =
        multiple && files
          ? ([...files, ...filesToUpload] as File[])
          : filesToUpload[0];

      if (fileToUpload instanceof File || Array.isArray(fileToUpload)) {
        const sizeKB =
          (fileToUpload instanceof File
            ? fileToUpload.size
            : fileToUpload.reduce((acc, file) => acc + file.size, 0)) / 1024;
        if (sizeKB > max) {
          setError(name, "to-big");
        }
      }

      setField(name, fileToUpload);
      dispatch("choose", fileToUpload);
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

<div class={styles?.wrapper ?? stylesinternal.wrapper} {...datasets}>
  {#if $$slots.out}
    <slot name="out" {image} />
  {/if}
  {#if $$slots.actions && !$errors[name] && !!$data[name]}
    <slot name="actions" {image} {onClear} />
  {/if}
  {#if $errors[name]}
    <div class={styles?.actions ?? stylesinternal.actions}>
      <span class={styles?.error ?? stylesinternal.error}>
        <slot name="error" error={$errors[name]}>
          {$errors[name]}
        </slot>
      </span>
      <button
        type="button"
        class={styles?.retry ?? stylesinternal.retry}
        on:click|stopPropagation={() => {
          dispatch("retry");
          onClear();
        }}
      >
        <slot name="retry" />
      </button>
    </div>
  {/if}
  <label for={id ?? name} class={styles?.field ?? stylesinternal.field}>
    {#if !$data[name]}
      <slot name="activate" {image} />
    {/if}
    <input
      bind:this={input}
      id={id ?? name}
      class={styles?.input ?? stylesinternal.input}
      type="file"
      {accept}
      on:change={onSelectFile}
      {name}
      {...$$restProps}
    />
  </label>
</div>

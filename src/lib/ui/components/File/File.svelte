<svelte:options immutable />

<script lang="ts">
  import { createEventDispatcher, onDestroy } from "svelte";
  import { generateDatas } from "$lib/logic/utils/objects.js";
  import { useForm } from "$lib/logic/stores/form.js";
  import { getStyle } from "$lib/logic/utils/styles.js";

  import type { UserEvent } from "$lib/logic/typing/globals/types.js";
  import type { Events, Input, Props } from "./File.proptypes.js";

  export let name: Props["name"];
  export let label: Props["label"] =
    "Drag and drop a file here, or click to select a file to upload.";
  export let context: Props["context"] = "form";
  export let id: Props["id"] = null;
  export let multiple: Props["multiple"] = false;
  export let accept: Props["accept"] = "image/*";
  export let max: Props["max"] = Infinity;
  export let datas: Props["datas"] = {};
  export let dragable: Props["dragable"] = true;

  let input: Input;
  let Kb = 1024;
  let draged = false;

  const dispatch = createEventDispatcher<Events>();
  $: form = useForm(context);
  $: ({ data, errors, styles: ctxStyles, setField, setError } = $form);
  $: ({ file: styles, replace } = $ctxStyles);

  $: file = !!$data[name] ? ($data[name] as File) : null;
  $: files = !!$data[name] ? ($data[name] as File[]) : null;

  $: image =
    file instanceof File
      ? {
          src: URL.createObjectURL(file),
          alt: file.name,
        }
      : null;

  $: datasets = generateDatas(datas);

  function onSetFiles(updatedFiles: File | File[]) {
    const newFiles = multiple
      ? [
          ...(files ?? []),
          ...(updatedFiles instanceof File ? [updatedFiles] : updatedFiles),
        ]
      : updatedFiles;
    const filesSize =
      (newFiles instanceof File
        ? newFiles.size
        : newFiles.reduce((acc, { size }) => acc + size, 0)) / Kb;
    if (filesSize > max) {
      setError(name, "to-big");
    }

    setField(name, newFiles);
    dispatch("choose", newFiles);
  }

  function onSelectFile({ currentTarget }: UserEvent<HTMLInputElement>) {
    const { files: inputFiles } = currentTarget;
    if (!inputFiles) return;

    onSetFiles(multiple ? [...inputFiles] : inputFiles[0]);
  }

  function onRemove(toRemove: File, index: number) {
    if (multiple && files) {
      setField(
        name,
        files.filter(
          (file, i) => `${i}-${file.name}` !== `${index}-${toRemove.name}`,
        ),
      );
    }
  }

  function onDrag(value?: unknown) {
    if (typeof value === "boolean") {
      draged = value;
      return;
    }
    draged = !draged;
  }

  function onDrop({ dataTransfer }: UserEvent<HTMLLabelElement, DragEvent>) {
    if (!dataTransfer) return;
    const { items } = dataTransfer;

    if (items.length === 0) return;

    let updatedFile: File | null = null;
    if (items[0].kind === "file") {
      updatedFile = items[0].getAsFile();
    }

    const updatedFiles = multiple
      ? [...items].flatMap((item) => {
          if (item.kind === "file") return item.getAsFile() ?? [];
          return [];
        })
      : updatedFile;
    if (!updatedFiles) return;

    onSetFiles(updatedFiles);
  }

  function onClear() {
    setField(name, undefined);
    if (input) input.value = "";
  }

  $: wrapperStyle = getStyle({
    replace,
    style: "svform-wrapper",
    external: styles?.wrapper,
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
  $: labelStyle = getStyle({
    replace,
    style: "svform-label",
    external: styles?.label,
  });
  $: inputStyle = getStyle({
    replace,
    style: "svform-input",
    external: styles?.input,
  });
  $: itemStyle = getStyle({
    replace,
    style: "svform-item",
    external: styles?.item,
  });
  $: coverStyle = getStyle({
    replace,
    style: "svform-cover",
    external: styles?.cover,
  });
  $: removeStyle = getStyle({
    replace,
    style: "svform-remove",
    external: styles?.remove,
  });

  onDestroy(() => {
    onClear();
  });
</script>

<div class={wrapperStyle} {...datasets}>
  <slot name="preview" {image} {onClear} {files} {multiple} {file}>
    {#if file && !multiple}
      <img
        src={image?.src}
        alt={image?.alt}
        class={coverStyle}
        loading="lazy"
        decoding="async"
      />
      <button
        type="button"
        on:click|stopPropagation={onClear}
        class={removeStyle}
      >
        X
      </button>
    {:else if files && multiple}
      {#each files as file, index (`${index}-${file.name}`)}
        <div class={itemStyle}>
          <img
            class={coverStyle}
            src={URL.createObjectURL(file)}
            alt={file.name}
          />
          <button
            type="button"
            class={removeStyle}
            on:click|stopPropagation={() => onRemove(file, index)}
          >
            X
          </button>
        </div>
      {/each}
    {/if}
  </slot>
  {#if $errors[name]}
    <span class={errorStyle}>
      <slot name="error" error={$errors[name]}>
        {$errors[name]}
      </slot>
    </span>
  {/if}
  {#if $errors[name] && (!file || !Array.isArray(files))}
    <button
      type="button"
      class={retryStyle}
      on:click|stopPropagation={() => {
        dispatch("retry");
        onClear();
      }}
    >
      <slot name="retry">Retry</slot>
    </button>
  {/if}
  {#if !$data[name] || multiple}
    <label
      for={id ?? name}
      class={fieldStyle}
      class:draged
      on:dragend|preventDefault={dragable ? () => onDrag(false) : undefined}
      on:dragenter|trusted|preventDefault={dragable ? onDrag : undefined}
      on:dragleave|trusted|preventDefault={dragable ? onDrag : undefined}
      on:dragover|preventDefault={dragable ? () => {} : undefined}
      on:drop|preventDefault={dragable ? onDrop : undefined}
      on:mouseleave|preventDefault={dragable ? () => onDrag(false) : undefined}
    >
      <p class={labelStyle}>
        <slot name="label">{label}</slot>
      </p>
      <input
        bind:this={input}
        id={id ?? name}
        class={inputStyle}
        type="file"
        {multiple}
        {accept}
        on:change={onSelectFile}
        {name}
        {...$$restProps}
      />
    </label>
  {/if}
</div>

<style>
  .svform-wrapper {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    box-sizing: border-box;
    width: 100%;
    gap: calc(var(--s-form-space) / 2);
    z-index: 0;
  }
  .svform-error {
    position: absolute;
    display: block;
    box-sizing: inherit;
    padding: 3px 5px;
    margin: 0;
    background-color: var(--s-form-error);
    font-family: var(--s-form-font);
    font-size: 12px;
    color: var(--s-form-text-error);
    text-align: center;
    border-radius: var(--s-form-radius);
    top: calc(100% + (var(--s-form-space) / 2));
    left: 0;
    z-index: 0;
  }
  .svform-retry {
    display: block;
    width: 100%;
    box-sizing: inherit;
    padding: calc(var(--s-form-space) / 2);
    background-color: var(--s-form-primary);
    border: none;
    border-radius: var(--s-form-radius);
    outline: 0;
  }
  .svform-retry:hover {
    cursor: pointer;
  }
  .svform-field {
    width: 100%;
    display: block;
    box-sizing: inherit;
    border-radius: var(--s-form-radius);
    border: var(--s-form-border);
    padding: 1rem;
  }
  .svform-field.draged,
  .svform-field:hover {
    --s-form-border-style: dashed;
    --s-form-border: var(--s-form-border-width) var(--s-form-border-style)
      var(--s-form-primary);
    cursor: pointer;
  }
  .svform-field.draged > .svform-label,
  .svform-field:hover > .svform-label {
    border-radius: calc(var(--s-form-radius) / 2);
    background-color: var(--s-form-primary);
    color: var(--s-form-secondary);
  }
  .svform-label {
    display: block;
    box-sizing: inherit;
    margin: 0;
    padding: calc(var(--s-form-space) * 1.5) var(--s-form-space);
    font-family: var(--s-form-font);
    text-align: center;
    transition:
      background-color 0.2s linear,
      color 0.2s linear;
    will-change: background-color, color;
  }
  .svform-input {
    display: none;
    width: 100%;
  }
  .svform-item {
    display: block;
    box-sizing: inherit;
    flex: 1 1 200px;
    position: relative;
    z-index: 0;
  }
  .svform-cover {
    display: block;
    box-sizing: inherit;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--s-form-radius);
    margin: 0;
    padding: 0;
  }
  .svform-remove {
    display: block;
    box-sizing: inherit;
    position: absolute;
    top: calc(var(--s-form-space) / 2);
    right: calc(var(--s-form-space) / 2);
    width: calc(var(--s-form-space) * 2);
    height: calc(var(--s-form-space) * 2);
    border-radius: 50%;
    padding: 0;
    background-color: var(--s-form-primary);
    color: var(--s-form-secondary);
    border: none;
    outline: 0;
    z-index: 0;
    transition:
      background-color 0.2s linear,
      color 0.2s linear;
    will-change: background-color, color;
  }
  .svform-remove:hover {
    cursor: pointer;
    background-color: var(--s-form-secondary);
    color: var(--s-form-primary);
  }
</style>

<svelte:options immutable />

<script lang="ts">
  import { createEventDispatcher, onDestroy } from "svelte";
  import { fade } from "svelte/transition";
  import { useForm } from "$lib/logic/stores/form.js";
  import { generateDatas } from "$lib/logic/utils/objects.js";
  import { hasArray } from "$lib/logic/utils/parse.js";
  import { getStyles } from "$lib/logic/utils/styles.js";

  import type { UserEvent } from "$lib/logic/typing/globals/types.js";
  import type { Events, Input, Props } from "./File.proptypes.js";

  type $$Props = Props;

  export let name: Props["name"];
  export let label: Props["label"] =
    "Drag and drop a file here, or click to select a file to upload.";
  export let context: Props["context"] = "form";
  export let id: Props["id"] = null;
  export let dragable: Props["dragable"] = true;
  export let multiple: Props["multiple"] = false;
  export let disabled: Props["disabled"] = false;
  export let accept: Props["accept"] = "image/*";
  export let max: Props["max"] = Infinity;
  export let styles: Props["styles"] = {};
  export let datas: Props["datas"] = {};

  let input: Input;
  let draged = false;

  const dispatch = createEventDispatcher<Events>();
  $: form = useForm(context);
  $: ({ data, errors, styles: ctxStyles, setField, setError } = $form);
  $: ({ file: ctxFileStyles, replace } = $ctxStyles);

  function onSetFiles(toAdd: File | File[]) {
    const updated = multiple
      ? [
          ...hasArray<File>($data[name]),
          ...(toAdd instanceof File ? [toAdd] : toAdd),
        ]
      : toAdd;

    if (updated instanceof File && updated.size > max!) {
      setError(name, "The file is too big");
      return;
    }

    if (Array.isArray(updated) && updated.some(({ size }) => size > max!)) {
      setError(name, "Some files are too big");
      return;
    }

    setField(name, updated);
    dispatch("choose", toAdd);
  }

  function onSelectFile({ currentTarget }: UserEvent<HTMLInputElement>) {
    const { files: inputFiles } = currentTarget;
    if (!inputFiles) return;

    onSetFiles(multiple ? [...inputFiles] : inputFiles[0]);
  }

  function onClear() {
    setField(name, undefined, false);
    if (input) input.value = "";
  }

  function onRemove(toRemove: File, index: number) {
    if (!multiple) return;

    const updated = hasArray<File>($data[name]).filter(
      (file, i) => `${i}-${file.name}` !== `${index}-${toRemove.name}`,
    );

    setField(name, updated);

    if (updated.length == 0 && input) input.value = "";
  }

  function onDrag(value?: unknown) {
    if (typeof value === "boolean") {
      draged = value;
    } else {
      draged = !draged;
    }
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

  $: many =
    multiple && Array.isArray($data[name]) ? ($data[name] as File[]) : null;
  $: single =
    !multiple && $data[name] instanceof File ? ($data[name] as File) : null;

  $: cover =
    single && single.type.includes("image")
      ? {
          src: URL.createObjectURL(single),
          alt: single.name,
        }
      : null;

  $: datasets = generateDatas(datas);

  $: styls = getStyles<Exclude<Props["styles"], undefined>>({
    replace,
    internals: {
      container: "faivform-file-container",
      cover: "faivform-file-cover",
      remove: "faivform-file-remove",
      items: "faivform-file-items",
      item: "faivform-file-item",
      error: "faivform-file-error",
      retry: "faivform-file-retry",
      content: "faivform-file-content",
      label: "faivform-file-label",
      input: "faivform-file-input",
    },
    externals: {
      container: styles?.container ?? ctxFileStyles?.container,
      cover: styles?.cover ?? ctxFileStyles?.cover,
      remove: styles?.remove ?? ctxFileStyles?.remove,
      items: styles?.items ?? ctxFileStyles?.items,
      item: styles?.item ?? ctxFileStyles?.item,
      error: styles?.error ?? ctxFileStyles?.error,
      retry: styles?.retry ?? ctxFileStyles?.retry,
      content: styles?.content ?? ctxFileStyles?.content,
      label: styles?.label ?? ctxFileStyles?.label,
      input: styles?.input ?? ctxFileStyles?.input,
    },
  });

  onDestroy(() => {
    onClear();
  });
</script>

<div class={styls.container} {...datasets}>
  {#if single}
    <div class={styls.item} data-single>
      <slot name="preview" {cover} file={single}>
        {#if cover}
          {@const { src, alt } = cover}
          <img
            {src}
            {alt}
            class={styls.cover}
            loading="lazy"
            decoding="async"
          />
        {:else}
          <span class={styls.cover} data-text>
            <span>{single.name}</span>
          </span>
        {/if}
      </slot>
      <button
        type="button"
        on:click|stopPropagation={() => {
          dispatch("remove");
          onClear();
        }}
        class={styls.remove}
      >
        <slot name="remove">X</slot>
      </button>
    </div>
  {/if}
  {#if many && many.length > 0}
    <div class={styls.items}>
      {#each many as file, index (index)}
        {@const cover = file.type.includes("image")
          ? {
              src: URL.createObjectURL(file),
              alt: file.name,
            }
          : null}
        <div class={styls.item}>
          <slot name="preview" {cover} {file}>
            {#if cover}
              <img
                class={styls.cover}
                src={cover.src}
                alt={cover.alt}
                loading="lazy"
                decoding="async"
              />
            {:else}
              <span class={styls.cover} data-text>
                <span>{file.name}</span>
              </span>
            {/if}
          </slot>
          <button
            type="button"
            class={styls.remove}
            on:click|stopPropagation={() => {
              dispatch("remove");
              onRemove(file, index);
            }}
          >
            <slot name="remove">X</slot>
          </button>
        </div>
      {/each}
    </div>
  {/if}
  {#if $errors[name] && !single && !multiple}
    <button
      type="button"
      class={styls.retry}
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
      class={styls.content}
      data-error={!!$errors[name]}
      class:draged
      aria-disabled={disabled}
      on:dragend|preventDefault={dragable ? () => onDrag(false) : undefined}
      on:dragenter|trusted|preventDefault={dragable ? onDrag : undefined}
      on:dragleave|trusted|preventDefault={dragable ? onDrag : undefined}
      on:dragover|preventDefault={dragable ? () => {} : undefined}
      on:drop|preventDefault={dragable ? onDrop : undefined}
      on:mouseleave|preventDefault={dragable ? () => onDrag(false) : undefined}
    >
      <input
        bind:this={input}
        id={id ?? name}
        class={styls.input}
        type="file"
        on:change={onSelectFile}
        {multiple}
        {accept}
        {name}
        {disabled}
        {...$$restProps}
      />
      <slot>
        {#if label}
          <p class={styls.label}>
            {label}
          </p>
        {/if}
      </slot>
    </label>
    <slot name="error" error={$errors[name]}>
      {#if $errors[name]}
        <span class={styls.error} transition:fade={{ duration: 200 }}>
          {$errors[name]}
        </span>
      {/if}
    </slot>
  {/if}
</div>

<style>
  :global(.faivform-file-container) {
    position: relative;
    box-sizing: border-box;
    display: flex;
    container: file / inline-size;
    width: 100%;
    gap: calc(var(--faivform-space) / 4);
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    z-index: 0;
  }

  :global(.faivform-file-cover) {
    display: block;
    box-sizing: inherit;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    object-fit: cover;
    background-color: rgb(var(--faivform-placeholder-200) / 1);
    border-radius: var(--faivform-radius);
  }
  :global(:root:is(.dark, [data-theme="dark"]) .faivform-file-cover) {
    background-color: rgb(var(--faivform-placeholder-400) / 1);
  }
  :global(.faivform-file-cover:is([data-text])) {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: calc(var(--faivform-space) * 2.5) calc(var(--faivform-space) * 1.5);
    aspect-ratio: 16 / 9;
    color: var(--faivform-primary-text);
    font-size: calc(var(--faivform-space) - (var(--faivform-space) / 8));
    line-height: calc(var(--faivform-space) + (var(--faivform-space) / 8));
    font-family: var(--faivform-placeholder-font);
  }
  :global(.faivform-file-cover:is([data-text]) > span) {
    display: block;
    width: 100%;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  :global(.faivform-file-remove) {
    display: block;
    box-sizing: inherit;
    position: absolute;
    aspect-ratio: 1 / 1;
    width: 8%;
    min-width: calc(var(--faivform-space) * 1.5);
    max-width: calc(var(--faivform-space) * 2.5);
    margin: 0;
    padding: 0;
    background-color: var(--faivform-placeholder-color);
    color: var(--faivform-placholder-text);
    font-size: calc((var(--faivform-space) / 2) + (var(--faivform-space) / 4));
    line-height: calc(
      (var(--faivform-space) / 2) + (var(--faivform-space) / 4)
    );
    font-weight: 500;
    font-family: var(--faivform-primary-font);
    border-radius: 50%;
    border: 0;
    outline: 0;
    top: calc(var(--faivform-space) / 2);
    right: calc(var(--faivform-space) / 2);
    z-index: 0;
    transition:
      background-color 0.2s linear,
      color 0.2s linear;
    will-change: background-color, color;
  }
  :global(.faivform-file-remove:is(:hover)) {
    cursor: pointer;
  }
  :global(.faivform-file-remove:is(:hover, :focus, :focus-visible)) {
    background-color: var(--faivform-error-color);
    color: var(--faivform-error-text);
  }

  :global(.faivform-file-retry) {
    display: block;
    width: 100%;
    box-sizing: inherit;
    padding: calc(var(--faivform-space) / 2) calc(var(--faivform-space) / 1.5);
    color: var(--faivform-primary-text);
    background-color: var(--faivform-placeholder-color);
    font-size: calc(var(--faivform-space) - (var(--faivform-space) / 8));
    line-height: calc(var(--faivform-space) + (var(--faivform-space) / 8));
    font-family: var(--faivform-primary-font);
    border-radius: var(--faivform-radius);
    border: 0;
    outline: 0;
  }
  :global(.faivform-file-retry:is(:hover)) {
    cursor: pointer;
  }

  :global(.faivform-file-items) {
    display: flex;
    width: 100%;
    box-sizing: inherit;
    gap: calc(var(--faivform-space) / 4);
    justify-content: flex-start;
    align-items: flex-start;
    overflow-x: auto;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
  }

  :global(.faivform-file-item) {
    box-sizing: inherit;
    display: block;
    position: relative;
    width: 100%;
    min-width: 250px;
    max-width: 288px;
    max-height: 162px;
    scroll-snap-align: start;
    z-index: 0;
  }

  :global(.faivform-file-content) {
    position: relative;
    width: 100%;
    display: block;
    box-sizing: inherit;
    padding: var(--faivform-space);
    border: var(--faivform-border-base);
    border-radius: var(--faivform-radius);
    transition: border 200ms linear;
    will-change: border;
    z-index: 0;
  }
  :global(.faivform-file-content:is([aria-disabled="true"])) {
    cursor: not-allowed;
    filter: grayscale(1) opacity(0.5);
  }
  :global(.faivform-file-content:not([aria-disabled="true"]):is(:hover)) {
    cursor: pointer;
  }
  :global(.faivform-file-content.draged),
  :global(
      .faivform-file-content:not(
          [data-error="true"],
          [aria-disabled="true"]
        ):is(:hover)
    ) {
    border-style: dashed;
    border-color: var(--faivform-secondary-color);
  }
  :global(.faivform-file-content.draged > .faivform-file-label),
  :global(
      .faivform-file-content:not(
          [data-error="true"],
          [aria-disabled="true"]
        ):is(:hover)
        > .faivform-file-label
    ),
  :global(.faivform-file-input:is(:focus) + .faivform-file-label) {
    background-color: var(--faivform-secondary-color);
    color: var(--faivform-secondary-text);
  }
  :global(.faivform-file-content:is([data-error="true"])) {
    border-color: var(--faivform-error-color);
  }
  :global(
      .faivform-file-content:is([data-error="true"]) > .faivform-file-label
    ) {
    color: var(--faivform-error-color);
  }
  :global(
      .faivform-file-content:is([data-error="true"]):is(:hover)
        > .faivform-file-label
    ) {
    background-color: var(--faivform-error-color);
    color: var(--faivform-error-text);
  }
  :global(
      .faivform-file-content:is([data-error="true"])
        > .faivform-file-input:is(:focus)
    ) {
    outline-color: var(--faivform-error-color);
  }

  :global(.faivform-file-input) {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    inset: 0;
    color: transparent;
    z-index: -1;
    border-radius: var(--faivform-radius);
  }
  :global(.faivform-file-input::file-selector-button) {
    display: none;
  }
  :global(.faivform-file-input:is(:disabled)) {
    display: none;
  }
  :global(.faivform-file-input:not(:disabled):is(:hover)) {
    cursor: pointer;
  }
  :global(.faivform-file-input:is(:focus)) {
    outline: var(--faivform-border-base);
    outline-color: var(--faivform-secondary-color);
    outline-width: calc(var(--faivform-border-width) * 2);
  }

  :global(.faivform-file-label) {
    position: relative;
    display: block;
    box-sizing: inherit;
    width: 100%;
    margin: 0;
    padding: calc(var(--faivform-space) * 1.5) var(--faivform-space);
    color: var(--faivform-primary-text);
    font-size: var(--faivform-space);
    line-height: calc(var(--faivform-space) + (var(--faivform-space) / 4));
    font-family: var(--faivform-primary-font);
    text-align: center;
    border-radius: calc(var(--faivform-radius) / 2);
    transition:
      background-color 200ms linear,
      color 200ms linear;
    will-change: background-color, color;
    z-index: 0;
  }

  :global(.faivform-file-error) {
    position: absolute;
    display: block;
    box-sizing: inherit;
    padding: calc(var(--faivform-space) / 4);
    background-color: transparent;
    color: var(--faivform-error-color);
    font-size: calc((var(--faivform-space) / 2) + (var(--faivform-space) / 4));
    line-height: calc(
      (var(--faivform-space) / 2) + (var(--faivform-space) / 4)
    );
    font-weight: 500;
    font-family: var(--faivform-error-font);
    border-radius: calc(var(--faivform-radius) / 1.5);
    top: calc(100% + var(--faivform-space) / 4);
    left: 0;
    z-index: 0;
  }

  @container file (max-width: 450px) {
    :global(.faivform-file-item:is([data-single])) {
      min-width: 100%;
      max-width: 100%;
      max-height: none;
    }
  }
</style>

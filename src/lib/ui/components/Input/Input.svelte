<script lang="ts">
  import { getContext, onDestroy } from "svelte";
  import { fade } from "svelte/transition";
  import { generateDatas } from "$lib/logic/utils/objects.js";
  import { keys } from "$lib/logic/utils/keys.js";

  import type { InputContext } from "$lib/logic/typing/globals/proptypes.js";
  import type { Input, Props } from "./Input.proptypes.js";

  import * as stylesinternal from "./Input.styles.js";

  export let name: Props["name"];
  export let context: Props["context"] = "form";
  export let id: Props["id"] = null;
  export let type: Props["type"] = "text";
  export let label: Props["label"] = null;
  export let datas: Props["datas"] = {};
  export let a11y: Props["a11y"] = {};

  let input: Input;
  let checked = false;
  let show = false;
  let mounted = false;

  const form = getContext<InputContext>(context);
  const { data, errors, styles: ctxStyles, setField, check } = $form;
  $: ({ input: styles, icons } = $ctxStyles);

  function toggleShow() {
    show = !show;
  }

  function onChecked(event: KeyboardEvent) {
    const enter = event.key === keys.enter;
    if (!mounted) mounted = true;
    if (enter) {
      checked = !checked;
    }
  }

  $: datasets = generateDatas(datas);

  $: {
    if (type === "checkbox") {
      if (!mounted && checked) mounted = true;
      setField(name, checked, mounted);
    }
  }

  onDestroy(() => {
    setField(name, undefined);
  });
</script>

<label
  for={id ?? name}
  class={styles?.field ?? stylesinternal.field}
  data-type={type}
  data-checked={checked}
  title={a11y.title}
  {...datasets}
>
  {#if label}
    <p class={styles?.label ?? stylesinternal.label}>
      {label}
      <slot />
    </p>
  {/if}
  {#if type === "textarea"}
    <textarea
      class={styles?.area ?? stylesinternal.area}
      id={id ?? name}
      bind:this={input}
      on:blur={check}
      {name}
      {...$$restProps}
    />
  {:else if type === "checkbox"}
    <input
      class={styles?.check ?? stylesinternal.check}
      id={id ?? name}
      type="checkbox"
      bind:this={input}
      on:keydown={onChecked}
      bind:checked
      {name}
      {...$$restProps}
    />
  {:else}
    <input
      class={styles?.input ?? stylesinternal.input}
      id={id ?? name}
      bind:this={input}
      on:blur={check}
      on:input={check}
      type={type === "password" && show ? "text" : type}
      value={$data[name] ?? ""}
      {name}
      {...$$restProps}
    />
  {/if}
  {#if type === "password"}
    <button
      type="button"
      class={styles?.show ?? stylesinternal.show}
      class:show
      on:click|stopPropagation={toggleShow}
      title={a11y.icon}
    >
      {#if icons}
        <img
          class={styles?.icon ?? stylesinternal.icon}
          src={show ? icons.show : icons.hide}
          alt={a11y.icon}
          decoding="async"
          loading="lazy"
          role="presentation"
        />
      {:else}
        <span />
      {/if}
    </button>
  {/if}
  {#if $errors[name]}
    <span class={styles?.error ?? stylesinternal.error} transition:fade>
      <slot name="error" error={$errors[name]}>
        {$errors[name]}
      </slot>
    </span>
  {/if}
</label>

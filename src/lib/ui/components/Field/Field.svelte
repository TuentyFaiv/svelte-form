<script lang="ts">
  import { onDestroy } from "svelte";
  import { fade } from "svelte/transition";
  import { cx } from "@emotion/css";
  import { generateDatas } from "$lib/logic/utils/objects.js";
  import { useForm } from "$lib/logic/stores/form.js";
  import { keys } from "$lib/logic/utils/keys.js";

  import type { Input, Props } from "./Field.proptypes.js";

  import * as stylesinternal from "./Field.styles.js";

  import IconShow from "../../assets/icon-show.svg";
  import IconHide from "../../assets/icon-hide.svg";

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

  const form = useForm(context);
  const { data, errors, styles: ctxStyles, setField, check } = $form;
  $: ({ field: styles, icons } = $ctxStyles);

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

  $: if (type === "checkbox") {
    if (!mounted && checked) mounted = true;
    setField(name, checked, mounted);
  }

  onDestroy(() => {
    setField(name, undefined);
  });
</script>

<label
  for={id ?? name}
  class={cx(stylesinternal.field, styles?.field ?? "")}
  data-type={type}
  data-checked={checked}
  data-checked-icon={icons?.check ?? ""}
  title={a11y.title}
  {...datasets}
>
  {#if label && type !== "checkbox"}
    <p class={cx(stylesinternal.label, styles?.label ?? "")}>
      {label}
      <slot />
    </p>
  {/if}
  {#if type === "textarea"}
    <textarea
      class={cx(stylesinternal.area, styles?.area ?? "")}
      id={id ?? name}
      bind:this={input}
      on:blur={check}
      {name}
      {...$$restProps}
    />
  {:else if type === "checkbox"}
    <input
      class={cx(stylesinternal.check, styles?.check ?? "")}
      id={id ?? name}
      type="checkbox"
      bind:this={input}
      bind:checked
      on:keydown={onChecked}
      {name}
      {...$$restProps}
    />
    {#if label}
      <p class={cx(stylesinternal.label, styles?.label ?? "")}>
        {label}
        <slot />
      </p>
    {/if}
  {:else}
    <input
      class={cx(stylesinternal.input, styles?.input ?? "")}
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
      class={cx(stylesinternal.action, styles?.action ?? "")}
      class:show
      on:click|stopPropagation={toggleShow}
      title={a11y.icon}
    >
      <img
        class={cx(stylesinternal.icon, styles?.icon ?? "")}
        src={show
          ? styles?.show ?? icons?.show ?? IconShow
          : styles?.hide ?? icons?.hide ?? IconHide}
        alt={a11y.icon}
        decoding="async"
        loading="lazy"
        role="presentation"
      />
    </button>
  {/if}
  {#if $errors[name]}
    <span class={cx(stylesinternal.error, styles?.error ?? "")} transition:fade>
      <slot name="error" error={$errors[name]}>
        {$errors[name]}
      </slot>
    </span>
  {/if}
</label>

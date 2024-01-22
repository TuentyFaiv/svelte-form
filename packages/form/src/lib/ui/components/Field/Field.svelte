<script lang="ts">
  import { onDestroy } from "svelte";
  import { fade } from "svelte/transition";
  import { generateDatas } from "$lib/logic/utils/objects.js";
  import { useForm } from "$lib/logic/stores/form.js";
  import { keys } from "$lib/logic/utils/keys.js";
  import { getStyle } from "$lib/logic/utils/styles.js";

  import type { UserEvent } from "$lib/logic/typing/globals/types.js";
  import type { Input, Props } from "./Field.proptypes.js";

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
  let show = false;

  $: form = useForm(context);
  $: ({ data, errors, styles: ctxStyles, setField, check } = $form);
  $: ({ field: styles, icons, replace } = $ctxStyles);

  function toggleShow() {
    show = !show;
  }

  function onChecked(event: UserEvent<HTMLInputElement, KeyboardEvent>) {
    if (event.code === keys.enter) {
      event.preventDefault();
      setField(name, !($data[name] ?? false));
    }
  }

  function onCheck({ currentTarget }: UserEvent<HTMLInputElement>) {
    setField(name, currentTarget.checked);
  }

  $: datasets = generateDatas(datas);

  $: showPassword = styles?.show ?? icons?.show ?? IconShow;
  $: hidePassword = styles?.hide ?? icons?.hide ?? IconHide;

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
  $: textAreaStyle = getStyle({
    replace,
    style: "svform-shared svform-textarea",
    external: styles?.area,
  });
  $: checkboxStyle = getStyle({
    replace,
    style: "svform-checkbox",
    external: styles?.check,
  });
  $: inputStyle = getStyle({
    replace,
    style: "svform-shared svform-input",
    external: styles?.input,
  });
  $: actionStyle = getStyle({
    replace,
    style: "svform-action",
    external: styles?.action,
  });
  $: iconStyle = getStyle({
    replace,
    style: "svform-icon",
    external: styles?.icon,
  });
  $: errorStyle = getStyle({
    replace,
    style: "svform-error",
    external: styles?.error,
  });

  onDestroy(() => {
    setField(name, undefined);
  });
</script>

<label
  for={id ?? name}
  class={fieldStyle}
  data-type={type}
  data-checked={$data[name] ?? false}
  data-checked-icon={icons?.check ?? ""}
  title={a11y.title}
  {...datasets}
>
  {#if label && type !== "checkbox"}
    <p class={labelStyle}>
      {label}
      <slot />
    </p>
  {/if}
  {#if type === "textarea"}
    <textarea
      class={textAreaStyle}
      id={id ?? name}
      bind:this={input}
      on:blur={check}
      value={$data[name] ?? ""}
      {name}
      {...$$restProps}
    />
  {:else if type === "checkbox"}
    <input
      class={checkboxStyle}
      id={id ?? name}
      type="checkbox"
      bind:this={input}
      checked={$data[name] ?? false}
      on:change={onCheck}
      on:keydown={onChecked}
      {name}
      {...$$restProps}
    />
    {#if label}
      <p class={labelStyle}>
        {label}
        <slot />
      </p>
    {/if}
  {:else}
    <input
      class={inputStyle}
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
      class={actionStyle}
      class:show
      on:click|stopPropagation={toggleShow}
      title={a11y.icon}
    >
      <img
        class={iconStyle}
        src={show ? showPassword : hidePassword}
        alt={a11y.icon}
        decoding="async"
        loading="lazy"
        role="presentation"
      />
    </button>
  {/if}
  {#if $errors[name]}
    <span class={errorStyle} transition:fade={{ duration: 200 }}>
      <slot name="error" error={$errors[name]}>
        {$errors[name]}
      </slot>
    </span>
  {/if}
</label>

<style>
  .svform-field {
    position: relative;
    display: block;
    box-sizing: border-box;
    width: 100%;
    z-index: 0;
  }
  .svform-field[data-type="password"] > span {
    right: 36px;
  }
  .svform-field[data-type="checkbox"] {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
  }
  .svform-field[data-type="checkbox"] > p {
    margin-bottom: 0;
  }
  .svform-field[data-type="checkbox"] > span {
    transform: translateY(115%);
    left: 0;
    right: auto;
    bottom: 0;
    cursor: default;
  }

  .svform-label {
    display: block;
    box-sizing: inherit;
    width: 100%;
    margin: 0 0 5px;
    color: var(--s-form-text);
    font-size: 16px;
    line-height: 18px;
    font-family: var(--s-form-font);
  }
  .svform-shared {
    width: 100%;
    box-sizing: inherit;
    padding: 4px 8px;
    color: var(--s-form-text);
    font-size: 14px;
    line-height: 16px;
    font-family: var(--s-form-font);
    border: var(--s-form-border);
    border-radius: var(--s-form-radius);
  }
  .svform-shared::placeholder {
    color: var(--s-form-placeholder);
    font-size: 14px;
    line-height: 16px;
    font-family: var(--s-form-font);
  }
  .svform-textarea {
    padding: 8px;
    min-height: 100px;
    resize: vertical;
  }
  /* .textarea::placeholder {
  } */
  .svform-checkbox {
    display: block;
    width: var(--s-form-space);
    height: var(--s-form-space);
    border-radius: var(--s-form-radius);
  }

  /* .svform-input {
  }
  .svform-input::placeholder {
  } */

  .svform-action {
    position: absolute;
    display: block;
    box-sizing: inherit;
    width: 26px;
    height: 26px;
    padding: 0;
    background-color: transparent;
    color: var(--s-form-text);
    font-size: 12px;
    line-height: 12px;
    font-family: var(--s-form-font);
    border: 0;
    bottom: 0;
    right: 6px;
    z-index: 0;
  }
  .svform-action:hover {
    cursor: pointer;
  }

  .svform-icon {
    display: block;
    box-sizing: inherit;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .svform-error {
    position: absolute;
    display: block;
    box-sizing: inherit;
    padding: 3px 5px;
    background-color: var(--s-form-error);
    color: var(--s-form-text-error);
    font-size: 12px;
    line-height: 12px;
    font-family: var(--s-form-font);
    transform: translateY(50%);
    border-radius: var(--s-form-radius);
    bottom: 13px;
    right: 5px;
    z-index: 0;
  }
</style>

<svelte:options immutable />

<script lang="ts">
  import { createEventDispatcher, onDestroy } from "svelte";
  import { slide } from "svelte/transition";
  import { keys } from "$lib/logic/utils/keys.js";
  import { generateDatas } from "$lib/logic/utils/objects.js";
  import { useForm } from "$lib/logic/stores/form.js";

  import type { Props, Select, Target } from "./Select.proptypes.js";

  import IconArrow from "../../assets/icon-arrow.svg";

  export let name: Props["name"];
  export let label: Props["label"] = null;
  export let id: Props["id"] = null;
  export let options: Props["options"] = [];
  export let placeholder: Props["placeholder"] = "";
  export let context: Props["context"] = "form";
  export let datas: Props["datas"] = {};

  let container: Select = null;
  let active = false;

  const dispatch = createEventDispatcher<{ choose: string }>();
  const form = useForm(context);
  const { data, errors, styles: ctxStyles, setField } = $form;
  $: ({ select: styles, icons } = $ctxStyles);

  function onChoose(value: string) {
    dispatch("choose", value);
  }

  function handleToggle() {
    active = !active;
  }

  function handleChoose(element: HTMLElement) {
    const option =
      element.role === "none" && element.tagName === "SPAN"
        ? element.parentElement ?? element
        : element;
    const { value } = option.dataset;
    if (value) {
      setField(name, value);
      onChoose(value);
    }
    active = false;
  }

  function handleSelect(event: MouseEvent) {
    const element = event.target as Target;
    const isMenu =
      element.role === "menu" ||
      (element.role === "none" && element.parentElement?.role === "menu") ||
      (element.role === "none" &&
        (element.parentElement?.role === "presentation" ||
          element.firstElementChild?.role === "presentation")) ||
      (element.role === "presentation" &&
        (element.parentElement?.role === "none" ||
          element.firstElementChild?.role === "none"));
    const isOption =
      (element.role === "none" &&
        (element.parentElement?.role === "menuitem" ||
          element.firstElementChild?.role === "menuitem")) ||
      (element.role === "menuitem" &&
        (element.parentElement?.role === "none" ||
          element.firstElementChild?.role === "none"));

    if (isOption) {
      handleChoose(element);
    } else if (isMenu) {
      handleToggle();
      if (container) container.lastElementChild?.scrollTo(0, 0);
    }
  }

  function onOpenByKey(event: KeyboardEvent) {
    if (event.code === keys.enter) {
      handleToggle();
    }
  }

  function onChooseByKey(event: KeyboardEvent) {
    const element = event.target as HTMLElement;
    if (event.code === keys.enter) {
      handleChoose(element);
    }
  }

  $: onHide = active
    ? () => {
        handleToggle();
        setField(name, $data[name] ?? "");
      }
    : undefined;

  $: datasets = generateDatas(datas);
  $: showedValue =
    options.find(({ value }) => value === $data[name])?.label ||
    (!!$data[name] ? $data[name] : placeholder);

  $: if (options.length === 1 && $data[name] !== options[0].value) {
    setField(name, options[0].value);
    onChoose(options[0].value);
  }

  $: externalFieldStyles = styles?.field ? ` ${styles.field}` : "";
  $: externalLabelStyles = styles?.label ? ` ${styles.label}` : "";
  $: externalSelectStyles = styles?.select ? ` ${styles.select}` : "";
  $: externalValueStyles = styles?.value ? ` ${styles.value}` : "";
  $: externalIconStyles = styles?.icon ? ` ${styles.icon}` : "";
  $: externalOptionsStyles = styles?.options ? ` ${styles.options}` : "";
  $: externalOptionStyles = styles?.option ? ` ${styles.option}` : "";
  $: externalErrorStyles = styles?.error ? ` ${styles.error}` : "";

  onDestroy(() => {
    setField(name, $data[name]);
  });
</script>

<div
  {id}
  class="field{externalFieldStyles}"
  role="menu"
  aria-label={label}
  tabindex={0}
  on:click|stopPropagation={!datas?.disabled ? handleSelect : undefined}
  on:keydown|stopPropagation={onOpenByKey}
  {...datasets}
>
  {#if label}
    <p class="label{externalLabelStyles}" role="none">
      {label}
    </p>
  {/if}
  <div
    role="none"
    class="select{externalSelectStyles}"
    class:active
    bind:this={container}
  >
    <p
      role="presentation"
      class="value{externalValueStyles}"
      data-placeholder={showedValue === placeholder}
    >
      {showedValue}
      <img
        src={styles?.arrow ?? icons?.arrow ?? IconArrow}
        alt={showedValue}
        class="icon{externalIconStyles}"
        role="presentation"
      />
      {#if $errors[name]}
        <span class="error{externalErrorStyles}" role="none">
          <slot name="error" error={$errors[name]}>
            {$errors[name]}
          </slot>
        </span>
      {/if}
    </p>
    {#if active}
      <div
        role="none"
        class="options{externalOptionsStyles}"
        on:mouseleave|stopPropagation={onHide}
        on:keydown|stopPropagation={onChooseByKey}
        transition:slide={{ delay: 200 }}
      >
        {#each options as option (option.key ?? option.value)}
          <span
            role="menuitem"
            aria-disabled={!!option.disabled}
            tabindex={0}
            data-value={option.value}
            class="option{externalOptionStyles}"
          >
            <span role="none">{option.label}</span>
          </span>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .field {
    position: relative;
    display: block;
    box-sizing: border-box;
    width: 100%;
    z-index: 1;
    &[data-disabled="true"] {
      pointer-events: none;
    }
    &:hover {
      cursor: pointer;
    }
  }
  .label {
    display: block;
    box-sizing: inherit;
    width: 100%;
    margin: 0 0 5px;
    color: var(--s-form-text);
    font-size: 16px;
    line-height: 18px;
    font-family: var(--s-form-font);
  }
  .select {
    position: relative;
    box-sizing: inherit;
    width: 100%;
    padding: 4px 8px;
    border: var(--s-form-border);
    border-radius: var(--s-form-radius);
    z-index: 0;
    &:is(:hover, :focus, :focus-within) {
    }
    &:is(:hover, :focus, :focus-within) > p {
    }
    &.active > p {
      & > img {
        transform: translateY(-50%) translateX(2px) rotateX(180deg);
      }
    }
  }
  .value {
    position: relative;
    box-sizing: inherit;
    width: 100%;
    min-height: 14px;
    margin: 0;
    color: var(--s-form-text);
    font-size: 14px;
    line-height: 16px;
    font-family: var(--s-form-font);
    z-index: 0;
    &[data-placeholder="true"] {
      color: var(--s-form-placeholder);
    }
  }
  .icon {
    position: absolute;
    display: block;
    box-sizing: inherit;
    width: 24px;
    height: 24px;
    object-fit: contain;
    top: 50%;
    right: 0;
    transform: translateY(-50%) translateX(2px);
    transition: transform 0.5s ease-in-out;
    z-index: 0;
  }
  .options {
    position: absolute;
    display: flex;
    box-sizing: inherit;
    width: 100%;
    max-height: 150px;
    background-color: var(--s-form-secondary);
    border: var(--s-form-border);
    border-radius: 0 0 var(--s-form-radius) var(--s-form-radius);
    overflow-y: auto;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    transform: translateX(-50%);
    top: 100%;
    left: 50%;
    z-index: 0;
    &::-webkit-scrollbar {
      width: 10px;
      background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
      width: 10px;
      background-color: var(--s-form-primary);
    }
  }
  .option {
    display: block;
    box-sizing: inherit;
    width: 100%;
    padding: 5px 10px;
    color: var(--s-form-text);
    font-size: 14px;
    line-height: 16px;
    font-family: var(--s-form-font);
    &[aria-disabled="true"] {
      pointer-events: none;
    }
    &:hover {
      background-color: var(--s-form-primary);
      & > span {
        pointer-events: none;
      }
    }
  }
  .error {
    position: absolute;
    display: block;
    padding: 3px 5px;
    box-sizing: inherit;
    background-color: var(--s-form-error);
    color: var(--s-form-text-error);
    font-size: 12px;
    line-height: 12px;
    font-family: var(--s-form-font);
    transform: translateY(50%);
    border-radius: var(--s-form-radius);
    bottom: 8px;
    right: 26px;
    z-index: 0;
  }
</style>

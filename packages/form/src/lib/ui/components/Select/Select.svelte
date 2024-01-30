<svelte:options immutable />

<script lang="ts">
  import { createEventDispatcher, onDestroy } from "svelte";
  import { fade } from "svelte/transition";
  import { keys, tags } from "$lib/logic/utils/keys.js";
  import { generateDatas } from "$lib/logic/utils/objects.js";
  import { useForm } from "$lib/logic/stores/form.js";
  import { getStyle } from "$lib/logic/utils/styles.js";

  import type { UserEvent } from "$lib/logic/typing/globals/types.js";
  import type { SelectOption } from "$lib/logic/typing/globals/interfaces.js";
  import type { Events, Props, Select, Target } from "./Select.proptypes.js";

  import { IconArrow } from "$lib/ui/assets/icons/index.js";

  export let name: Props["name"];
  export let label: Props["label"] = null;
  export let id: Props["id"] = null;
  export let searchable: Props["searchable"] = true;
  export let multiple: Props["multiple"] = false;
  export let disabled: Props["disabled"] = false;
  export let autoselectable: Props["autoselectable"] = true;
  export let options: Props["options"] = [];
  export let placeholder: Props["placeholder"] = "";
  export let context: Props["context"] = "form";
  export let clearable: Props["clearable"] = true;
  export let datas: Props["datas"] = {};

  let select: HTMLDivElement | null = null;
  let labelElement: HTMLParagraphElement | null = null;
  let container: Select = null;
  let valueBoxElement: HTMLDivElement | null = null;
  let searchableElement: HTMLInputElement | null = null;
  let arrowElement: HTMLImageElement | null = null;
  let errorElement: HTMLSpanElement | null = null;
  let optionsElement: HTMLDivElement | null = null;

  let active = false;
  let search = "";

  const dispatch = createEventDispatcher<Events>();
  $: form = useForm(context);
  $: ({ data, errors, styles: ctxStyles, setField } = $form);
  $: ({ select: styles, icons, replace } = $ctxStyles);

  function onChoose(value: string) {
    dispatch("choose", value);
  }

  function onToggle() {
    active = !active;
  }

  function onHasValue() {
    if (!multiple && $data[name]) {
      const selection = options.find(({ value }) => value === $data[name]);
      search = selection?.label ?? "";
    }
  }

  function handleChoose(element: HTMLElement) {
    const isOptions = element === optionsElement;
    const option = isOptions
      ? (element.firstElementChild as HTMLElement)
      : element;
    const { value } = option.dataset;
    if (value) {
      const selection = options.find(({ value: v }) => v === value);
      const newValue = multiple
        ? ([...($data[name] ?? []), value] as string[])
        : value;
      search = multiple ? "" : selection?.label ?? "";
      setField(name, newValue);
      onChoose(value);
    }
    active = multiple;
  }

  function handleSelect({ target }: UserEvent<Target, MouseEvent>) {
    const element = target as Target;
    const isSelect = element === select;
    const isLabel = element === labelElement;
    const isContainer = element === container;
    const isValueBox = element === valueBoxElement;
    const isShowedOption =
      element.tagName === tags.span &&
      JSON.parse(element.dataset.optionShowed ?? "false");
    const isSearchable = element === searchableElement;
    const isArrow = element === arrowElement;
    const isError = element === errorElement;
    const isOptions = element === optionsElement;

    const isMenu =
      isSelect ||
      isLabel ||
      isContainer ||
      isValueBox ||
      isShowedOption ||
      isSearchable ||
      isArrow ||
      isError ||
      isOptions;
    const isOption =
      element.tagName === tags.span &&
      JSON.parse(element.dataset.option ?? "false") &&
      !isMenu;

    if (isOption) {
      handleChoose(element);
    } else if (isMenu) {
      onToggle();
      if (container) container.lastElementChild?.scrollTo(0, 0);
    }
  }

  function onOpenByKey({ code }: UserEvent<HTMLDivElement, KeyboardEvent>) {
    if (code === keys.enter) {
      onToggle();
    }
  }

  function onChooseByKey({
    code,
    target,
  }: UserEvent<HTMLDivElement, KeyboardEvent>) {
    if (code === keys.enter) {
      handleChoose(target as HTMLElement);
    }
  }

  function onHide() {
    onToggle();
    onHasValue();
    setField(name, $data[name] ?? (multiple ? [] : ""));
  }

  function onRemove(option: SelectOption) {
    const selection: string[] = $data[name] ?? [];
    const newSelection = selection.filter((value) => value !== option.value);
    setField(name, newSelection);
  }

  function onClear() {
    setField(
      name,
      multiple
        ? options.filter(({ fixed }) => fixed).map(({ value }) => value)
        : "",
    );
    search = "";
  }

  $: datasets = generateDatas(datas);

  $: if (
    autoselectable &&
    options.length === 1 &&
    $data[name] !== options[0].value
  ) {
    const value = options[0].value;
    setField(name, multiple ? [value] : value);
    onChoose(value);
    onHasValue();
  }

  $: if (multiple) {
    const fixedValues = options
      .filter(({ fixed }) => fixed)
      .map(({ value }) => value);
    if (fixedValues.length > 0) setField(name, fixedValues);
  }

  $: optionsToShow = (
    searchable
      ? options.filter(({ label }) =>
          label.toLowerCase().includes(search.toLowerCase()),
        )
      : options
  ).filter(({ value }) =>
    multiple
      ? !($data[name] ?? []).some((item: string) => item === value)
      : true,
  );

  $: showedValue = (
    multiple
      ? options.filter(({ value }) =>
          ($data[name] ?? []).some((item: string) => item === value),
        )
      : options.find(({ value }) => value === $data[name])?.label ||
        ($data[name] ?? null)
  ) as SelectOption[] | string | null;

  $: toClear =
    multiple && Array.isArray(showedValue)
      ? showedValue.filter(({ fixed }) => !fixed)
      : showedValue;
  $: showClear =
    (typeof clearable === "boolean" ? clearable : clearable($data[name])) &&
    toClear &&
    toClear.length > 0;

  $: if ($data[name]) {
    onHasValue();
  }

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
  $: selectStyle = getStyle({
    replace,
    style: "svform-select",
    external: styles?.select,
  });
  $: valueStyle = getStyle({
    replace,
    style: "svform-value",
    external: styles?.value,
  });
  $: itemStyle = getStyle({
    replace,
    style: "svform-item",
    external: styles?.item,
  });
  $: removeStyle = getStyle({
    replace,
    style: "svform-remove",
    external: styles?.remove,
  });
  $: searchableStyle = getStyle({
    replace,
    style: "svform-searchable",
    external: styles?.searchable,
  });
  $: clearStyle = getStyle({
    replace,
    style: "svform-clear",
    external: styles?.clear,
  });
  $: iconStyle = getStyle({
    replace,
    style: "svform-icon",
    external: styles?.icon,
  });
  $: optionsStyle = getStyle({
    replace,
    style: "svform-options",
    external: styles?.options,
  });
  $: optionStyle = getStyle({
    replace,
    style: "svform-option",
    external: styles?.option,
  });
  $: errorStyle = getStyle({
    replace,
    style: "svform-error",
    external: styles?.error,
  });
  $: emptyStyle = getStyle({
    replace,
    style: "svform-empty",
    external: styles?.empty,
  });

  onDestroy(() => {
    setField(name, $data[name]);
  });
</script>

<div
  {id}
  bind:this={select}
  class={fieldStyle}
  role="menu"
  aria-label={label}
  tabindex={0}
  on:click|stopPropagation={!disabled ? handleSelect : undefined}
  on:keydown|stopPropagation={onOpenByKey}
  on:mouseleave|stopPropagation={active ? onHide : undefined}
  data-disabled={disabled}
  {...datasets}
>
  {#if label}
    <p
      bind:this={labelElement}
      class={labelStyle}
      data-label={true}
      role="presentation"
    >
      {label}
    </p>
  {/if}
  <div
    role="presentation"
    class={selectStyle}
    class:active
    data-multiple={multiple}
    bind:this={container}
  >
    <div role="presentation" class={valueStyle} bind:this={valueBoxElement}>
      {#if multiple && Array.isArray(showedValue)}
        {#each showedValue as option (option.key ?? option.value)}
          <span
            role="presentation"
            class={itemStyle}
            data-item-showed={true}
            data-item-fixed={option.fixed}
          >
            {option.label}
            {#if !option.fixed}
              <button
                type="button"
                class="svform-remove-childs {removeStyle}"
                on:click|stopPropagation={() => onRemove(option)}
              >
                <slot name="remove">x</slot>
              </button>
            {/if}
          </span>
        {/each}
      {/if}
      {#if searchable}
        <input
          type="text"
          class={searchableStyle}
          data-multiple={multiple}
          bind:this={searchableElement}
          bind:value={search}
          on:input={!active ? onToggle : undefined}
          {placeholder}
        />
      {:else if !searchable && (!Array.isArray(showedValue) || showedValue.length === 0)}
        <input
          type="text"
          class={searchableStyle}
          data-multiple={multiple}
          value={showedValue}
          readonly
          bind:this={searchableElement}
          {placeholder}
        />
      {/if}
      {#if $errors[name]}
        <span
          bind:this={errorElement}
          class="svform-error-childs {errorStyle}"
          role="presentation"
          transition:fade={{ duration: 200 }}
        >
          <slot name="error" error={$errors[name]}>
            {$errors[name]}
          </slot>
        </span>
      {/if}
    </div>
    {#if showClear}
      <button
        type="button"
        class="svform-clear-childs {clearStyle}"
        on:click|stopPropagation={onClear}
      >
        <slot name="clear">X</slot>
      </button>
    {/if}
    <img
      src={styles?.arrow ?? icons?.arrow ?? `IconArrow`}
      alt={placeholder}
      class={iconStyle}
      bind:this={arrowElement}
      role="presentation"
    />
    {#if active}
      <div
        role="presentation"
        class={optionsStyle}
        bind:this={optionsElement}
        on:keydown|stopPropagation={onChooseByKey}
      >
        {#each optionsToShow as option (option.key ?? option.value)}
          <span
            role="menuitem"
            aria-disabled={!!option.disabled}
            tabindex={0}
            class="svform-option-childs {optionStyle}"
            data-value={option.value}
            data-option={true}
          >
            <slot name="option" {option}>
              {option.label}
            </slot>
          </span>
        {/each}
        {#if optionsToShow.length === 0}
          <span class={emptyStyle}>
            <slot name="empty">No options</slot>
          </span>
        {/if}
      </div>
    {/if}
  </div>
</div>

<style>
  .svform-field {
    position: relative;
    display: block;
    box-sizing: border-box;
    width: 100%;
    z-index: 1;
  }
  .svform-field[data-disabled="true"] {
    pointer-events: none;
  }
  .svform-field:hover {
    cursor: pointer;
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
  .svform-select {
    position: relative;
    box-sizing: inherit;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0;
    padding-right: 34px;
    border: var(--s-form-border);
    border-radius: var(--s-form-radius);
    z-index: 0;
  }
  .svform-select[data-multiple="true"] {
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 8px;
  }
  /* .svform-select:is(:hover, :focus, :focus-within) {
  }
  .svform-select:is(:hover, :focus, :focus-within) > p {
  } */
  /* .svform-select.active > p {
  } */
  .svform-select.active > img {
    transform: translateY(-50%) translateX(2px) rotateX(180deg);
  }
  .svform-value {
    position: relative;
    box-sizing: inherit;
    display: flex;
    width: 100%;
    align-items: stretch;
    justify-content: flex-start;
    gap: 4px;
    flex-wrap: wrap;
    min-height: 14px;
    margin: 0;
    z-index: 0;
  }
  .svform-item {
    box-sizing: inherit;
    display: flex;
    width: max-content;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding-left: 4px;
    background-color: var(--s-form-primary);
    color: var(--s-form-text);
    font-size: 14px;
    line-height: 16px;
    font-family: var(--s-form-font);
    border-radius: 3px;
  }
  .svform-item[data-item-fixed="true"] {
    background-color: var(--s-form-primary);
    filter: brightness(0.75);
    padding: 0 4px;
  }
  .svform-remove {
    display: block;
    box-sizing: inherit;
    width: 16px;
    height: 100%;
    margin: 0;
    padding: 0 5px 0 4px;
    font-size: 12px;
    line-height: 12px;
    border: 0;
    border-left: 1px solid var(--s-form-placeholder);
    border-radius: 0 3px 3px 0;
    background-color: var(--s-form-primary);
  }
  .svform-remove:hover {
    cursor: pointer;
    color: var(--s-form-text-error);
    background-color: var(--s-form-error);
  }
  .svform-searchable {
    display: block;
    box-sizing: inherit;
    flex: 1;
    width: 100%;
    min-width: 100px;
    padding: 4px 8px;
    color: var(--s-form-text);
    font-size: 14px;
    line-height: 16px;
    font-family: var(--s-form-font);
    border: 0;
  }
  .svform-searchable:read-only {
    cursor: pointer;
    border: 0;
  }
  .svform-searchable[data-multiple="true"] {
    padding: 0;
  }
  .svform-searchable::placeholder {
    color: var(--s-form-placeholder);
    font-size: 14px;
    line-height: 16px;
    font-family: var(--s-form-font);
  }
  .svform-clear {
    display: block;
    box-sizing: inherit;
    width: 16px;
    min-width: 16px;
    height: 100%;
    min-height: 16px;
    margin: 0;
    padding: 0;
    font-size: 14px;
    line-height: 14px;
    border: 0;
    border-radius: calc(var(--s-form-radius) / 2);
    background-color: var(--s-form-primary);
  }
  .svform-clear:hover {
    cursor: pointer;
    color: var(--s-form-text-error);
    background-color: var(--s-form-error);
  }
  .svform-icon {
    position: absolute;
    display: block;
    box-sizing: inherit;
    width: 24px;
    height: 24px;
    object-fit: contain;
    top: 50%;
    right: 8px;
    transform: translateY(-50%) translateX(2px);
    transition: transform 0.5s ease-in-out;
    z-index: 0;
    pointer-events: none;
  }
  .svform-options {
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
  }
  .svform-options::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
  }
  .svform-options::-webkit-scrollbar-thumb {
    width: 10px;
    background-color: var(--s-form-primary);
  }

  .svform-remove-childs > *,
  .svform-clear-childs > *,
  .svform-error-childs > *,
  .svform-option-childs > * {
    pointer-events: none;
  }

  .svform-option {
    display: block;
    box-sizing: inherit;
    width: 100%;
    padding: 5px 10px;
    color: var(--s-form-text);
    font-size: 14px;
    line-height: 16px;
    font-family: var(--s-form-font);
  }
  .svform-option[aria-disabled="true"] {
    pointer-events: none;
  }
  .svform-option:hover {
    background-color: var(--s-form-primary);
  }
  .svform-option:hover > span {
    pointer-events: none;
  }
  .svform-empty {
    display: block;
    box-sizing: inherit;
    width: 100%;
    padding: 12px 10px;
    color: var(--s-form-placeholder);
    font-size: 14px;
    text-align: center;
    line-height: 16px;
    font-family: var(--s-form-font);
  }
  .svform-error {
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
    transform: translateY(-50%);
    top: 50%;
    right: 0;
    z-index: 0;
  }
</style>

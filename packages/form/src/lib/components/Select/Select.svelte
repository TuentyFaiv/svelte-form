<svelte:options immutable />

<script lang="ts">
  import { onDestroy } from "svelte";
  import { fade, slide } from "svelte/transition";
  import { Trash2, X, ChevronDown, Check } from "lucide-svelte";
  import { useForm } from "$lib/logic/stores/form.js";
  import { keys } from "$lib/logic/utils/keys.js";
  import { isSelected } from "$lib/logic/utils/objects.js";
  import { hasArray } from "$lib/logic/utils/parse.js";
  import { getStyles } from "$lib/logic/utils/styles.js";

  import type { UserEvent } from "$lib/logic/typing/globals/types.js";
  import type { SelectOption } from "$lib/logic/typing/globals/interfaces.js";
  import type { Props } from "./Select.proptypes.js";

  import "./Select.css";

  type $$Props = Props;

  export let name: Props["name"];
  export let context: Props["context"] = "form";
  export let label: Props["label"] = null;
  export let placeholder: Props["placeholder"] = "";
  export let id: Props["id"] = null;
  export let autoselect: Props["autoselect"] = true;
  export let searchable: Props["searchable"] = true;
  export let clearable: Props["clearable"] = true;
  export let multiple: Props["multiple"] = false;
  export let disabled: Props["disabled"] = false;
  export let clearOnDestroy: Props["clearOnDestroy"] = false;
  export let parent: Props["parent"] = undefined;
  export let options: Props["options"] = [];
  export let styles: Props["styles"] = {};
  // events prepare for svelte 5
  export let onchoose: Props["onchoose"] = undefined;
  export let onremove: Props["onremove"] = undefined;
  export let onclear: Props["onclear"] = undefined;

  let combobox: HTMLInputElement | HTMLDivElement | null = null;
  let listbox: HTMLUListElement | null = null;
  let nextOption: HTMLLIElement | null = null;

  let active = false;
  let search = "";
  let fixed: SelectOption[] | null = null;

  $: form = useForm<{ [k: string]: string | string[] | undefined | null }>(
    context,
  );
  $: ({ data, errors, styles: ctxStyles, setField, setError } = $form);
  $: ({ select: ctxSelectStyles, replace } = $ctxStyles);

  function onBlurOption() {
    nextOption?.classList.remove("focus");
    nextOption = null;
    combobox?.setAttribute("aria-activedescendant", "");
  }

  function onToggle(open?: unknown) {
    if (typeof open === "boolean") {
      active = open;
    } else {
      active = !active;
    }
  }

  function onHasValue(validate = true) {
    if (!multiple) {
      const selected = options.find(({ value }) => value === $data[name]);

      search = selected?.label ?? "";
      if (!selected) setField(name, null, validate);
    } else {
      fixed = options.filter((option) => option.fixed);

      const selected = [
        ...fixed,
        ...options.filter(({ value }) => isSelected($data[name], value)),
      ];
      const selectedSet = [...new Set(selected.map(({ value }) => value))];

      const value = selectedSet.length > 0 ? selectedSet : null;

      setField(name, value, validate);
    }
  }

  function onHide() {
    onToggle(false);
    onHasValue();
    onBlurOption();
  }

  function onRemove(option: SelectOption) {
    const newSelection = hasArray<string>($data[name]).filter(
      (value) => value !== option.value,
    );
    setField(name, newSelection);
    onremove?.(option);
  }

  function onClear() {
    const value = multiple
      ? (fixed?.map(({ value: valueFixed }) => valueFixed) ?? null)
      : null;
    setField(name, value);
    search = "";
    onclear?.();
  }

  $: if (options.length > 0 || $data[name]) {
    onHasValue(false);
  }

  $: if (autoselect && options.length === 1) {
    const { value } = options[0];
    setField(name, multiple ? [value] : value, false);
    onHasValue();
    onchoose?.(options[0]);
  }

  $: optionsToShow = (
    searchable && search.toLowerCase() !== $data[name]
      ? options.filter(
          (option) =>
            // eslint-disable-next-line implicit-arrow-linebreak
            option.label.toLowerCase().includes(search.toLowerCase()),
          // eslint-disable-next-line function-paren-newline
        )
      : options
  ).filter(({ value }) => (multiple ? !isSelected($data[name], value) : true));

  $: items = (
    multiple
      ? hasArray<string>($data[name]).flatMap(
          (value) => options.find((option) => option.value === value) ?? [],
        )
      : options.find(({ value }) => value === $data[name])?.label ||
        ($data[name] ?? null)
  ) as SelectOption[] | string | null;

  $: toClear =
    multiple && Array.isArray(items)
      ? items.filter((option) => !option.fixed)
      : items;
  $: showClear = clearable && toClear && toClear.length > 0;

  function onChoose(element: HTMLLIElement) {
    const { value } = element.dataset;
    if (!value) return;

    const selection = options.find((option) => option.value === value);

    if (!selection) {
      setError(name, "Invalid option, this option does not exist");
      return;
    }

    const updated: string | string[] = multiple
      ? [...hasArray<string>($data[name]), selection.value]
      : selection.value;

    if (searchable) {
      if (multiple) {
        search = optionsToShow.length > 1 ? search : "";
      } else {
        search = selection.label ?? "";
      }
    }

    setField(name, updated);
    onchoose?.(selection);
  }

  function getOption(option: Element | null, direction: "up" | "down") {
    const optionsList = Array.from(listbox?.children ?? []);
    if (!option) {
      return direction === "down"
        ? (listbox?.firstElementChild as HTMLLIElement)
        : (listbox?.lastElementChild as HTMLLIElement);
    }

    const index = optionsList.indexOf(option);

    if (direction === "down") {
      if (option !== listbox?.lastElementChild) {
        return optionsList[index + 1] as HTMLLIElement;
      }
      return listbox?.firstElementChild as HTMLLIElement;
    }

    if (option !== listbox?.firstElementChild) {
      return optionsList[index - 1] as HTMLLIElement;
    }

    return listbox?.lastElementChild as HTMLLIElement;
  }

  function onFocusOption(code: string) {
    if (listbox?.children.length) {
      const current = getOption(nextOption, code === keys.up ? "up" : "down");
      nextOption = current;

      combobox?.setAttribute("aria-activedescendant", current.id);
      current.classList.add("focus");
      current.scrollIntoView({ block: "nearest", behavior: "smooth" });

      if (listbox?.children && listbox.children.length > 1) {
        const prevOption = getOption(
          current,
          code === keys.down ? "up" : "down",
        );
        prevOption.classList.remove("focus");
      }
    }
  }

  function onKeyDown(
    event: UserEvent<HTMLInputElement | HTMLDivElement, KeyboardEvent>,
  ) {
    if (event.code === keys.down || event.code === keys.up) {
      if (!searchable) event.preventDefault();
      onToggle(true);
      onFocusOption(event.code);
    }
    if (event.code === keys.tab) {
      onHide();
    }
    if (event.code === keys.enter && nextOption) {
      event.preventDefault();
      onChoose(nextOption);
      if (multiple) {
        onBlurOption();
        onFocusOption(keys.down);
      }
    }
    if (
      event.code === keys.backspace &&
      multiple &&
      Array.isArray(toClear) &&
      toClear.length > 0
    ) {
      if (!searchable) event.preventDefault();
      onRemove(toClear[toClear.length - 1]);
    }
  }

  function onKeyUp(
    event: UserEvent<HTMLInputElement | HTMLDivElement, KeyboardEvent>,
  ) {
    if (!searchable) event.preventDefault();
    if (event.code === keys.esc) {
      onHide();
    }
  }

  function onClickOpen() {
    if (multiple) {
      if (!active) {
        return onToggle();
      }

      // eslint-disable-next-line consistent-return
      return;
    }

    return onToggle();
  }

  $: styls = getStyles<Exclude<Props["styles"], undefined>>({
    replace,
    internals: {
      container: "svorm-select-container",
      label: "svorm-select-label",
      select: "svorm-select-menu",
      value: "svorm-select-value",
      item: "svorm-select-item",
      remove: "svorm-select-remove",
      searchable: "svorm-select-searchable",
      nonsearchable: "svorm-select-nonsearchable",
      clear: "svorm-select-clear",
      arrow: "svorm-select-arrow",
      icon: "svorm-select-icon",
      options: "svorm-select-options",
      option: "svorm-select-option",
      error: "svorm-select-error",
      empty: "svorm-select-empty",
    },
    externals: {
      container: styles?.container ?? ctxSelectStyles?.container,
      label: styles?.label ?? ctxSelectStyles?.label,
      select: styles?.select ?? ctxSelectStyles?.select,
      value: styles?.value ?? ctxSelectStyles?.value,
      item: styles?.item ?? ctxSelectStyles?.item,
      remove: styles?.remove ?? ctxSelectStyles?.remove,
      searchable: styles?.searchable ?? ctxSelectStyles?.searchable,
      nonsearchable: styles?.nonsearchable ?? ctxSelectStyles?.nonsearchable,
      clear: styles?.clear ?? ctxSelectStyles?.clear,
      icon: styles?.icon ?? ctxSelectStyles?.icon,
      options: styles?.options ?? ctxSelectStyles?.options,
      option: styles?.option ?? ctxSelectStyles?.option,
      error: styles?.error ?? ctxSelectStyles?.error,
      empty: styles?.empty ?? ctxSelectStyles?.empty,
    },
  });
  let toTop = false;

  $: onIntersect = ([entry]: IntersectionObserverEntry[]) => {
    const { bottom } = entry.boundingClientRect;
    const onWindow = bottom > window.innerHeight;

    if (!entry.isIntersecting && !parent) {
      toTop = onWindow;
    }

    if (!entry.isIntersecting && parent) {
      const client = parent.getBoundingClientRect();
      toTop = bottom > client.bottom || onWindow;
    }
  };

  $: observer =
    typeof window !== "undefined"
      ? new IntersectionObserver(onIntersect, {
          threshold: 1,
        })
      : undefined;

  $: if (listbox) {
    observer?.unobserve(listbox);
    observer?.observe(listbox);
  }

  onDestroy(() => {
    if (clearOnDestroy) setField(name, undefined, false);
    observer?.disconnect();
  });
</script>

{#key form}
  <label
    for={id ?? name}
    class={styls.container}
    class:top={toTop}
    data-disabled={disabled}
    on:mouseleave|stopPropagation={active ? onHide : undefined}
  >
    <slot>
      {#if label}
        <span
          class={styls.label}
          id={!searchable ? `${id ?? name}-label` : undefined}
        >
          {label}
        </span>
      {/if}
    </slot>
    <div
      class={styls.select}
      class:active
      data-multiple={multiple}
      data-error={!!$errors[name]}
      role="presentation"
    >
      {#if searchable}
        <div role="presentation" class={styls.value}>
          {#if multiple && Array.isArray(items)}
            {#each items as item (item.key ?? item.value)}
              <span
                role="presentation"
                class={styls.item}
                data-fixed={item.fixed}
                in:fade={{ duration: 200 }}
                out:slide={{ duration: 250, axis: "x" }}
              >
                <slot name="item" {item}>
                  {item.label}
                </slot>
                {#if !item.fixed}
                  <button
                    type="button"
                    class={styls.remove}
                    on:click|stopPropagation={() => onRemove(item)}
                  >
                    <slot name="remove">
                      <X size={18} class={styls.icon} />
                    </slot>
                  </button>
                {/if}
              </span>
            {/each}
          {/if}
          <input
            id={id ?? name}
            type="text"
            class={styls.searchable}
            role="combobox"
            aria-autocomplete="both"
            aria-expanded={active}
            aria-controls="{id ?? name}-listbox"
            aria-activedescendant=""
            bind:this={combobox}
            bind:value={search}
            on:input={!active ? onToggle : undefined}
            on:click={!disabled ? onClickOpen : undefined}
            on:keydown={!disabled ? onKeyDown : undefined}
            on:keyup={!disabled ? onKeyUp : undefined}
            {placeholder}
            {disabled}
          />
        </div>
      {:else}
        <div
          id={id ?? name}
          role="combobox"
          class={styls.value}
          aria-controls="{id ?? name}-listbox"
          aria-expanded={active}
          aria-haspopup="listbox"
          aria-labelledby="{id ?? name}-label"
          aria-activedescendant=""
          tabindex={0}
          aria-disabled={disabled}
          bind:this={combobox}
          on:click={!disabled ? onClickOpen : undefined}
          on:keydown={!disabled ? onKeyDown : undefined}
          on:keyup={!disabled ? onKeyUp : undefined}
        >
          {#if multiple && Array.isArray(items)}
            {#each items as item (item.key ?? item.value)}
              <span
                role="presentation"
                class={styls.item}
                data-fixed={item.fixed}
                in:fade={{ duration: 200 }}
                out:slide={{ duration: 250, axis: "x" }}
              >
                <slot name="item" {item}>
                  {item.label}
                </slot>
                {#if !item.fixed}
                  <button
                    type="button"
                    class={styls.remove}
                    on:click|stopPropagation={() => onRemove(item)}
                  >
                    <slot name="remove">
                      <X size={18} class={styls.icon} />
                    </slot>
                  </button>
                {/if}
              </span>
            {/each}
          {/if}
          {#if !multiple || (Array.isArray(items) && items.length === 0)}
            <span
              class={styls.nonsearchable}
              data-placeholder={items?.length === 0 || !items}
              role="presentation"
            >
              {items && items.length > 0 ? (items ?? placeholder) : placeholder}
            </span>
          {/if}
        </div>
      {/if}
      {#if showClear}
        <button
          id="{id ?? name}-clear"
          type="button"
          class={styls.clear}
          tabindex={-1}
          on:click|stopPropagation={onClear}
        >
          <slot name="clear">
            <Trash2 size={18} class={styls.icon} />
          </slot>
        </button>
      {/if}
      <button
        type="button"
        id="{id ?? name}-button"
        class={styls.arrow}
        aria-label={label}
        aria-expanded={active}
        aria-controls="{id ?? name}-listbox"
        tabindex={-1}
        on:click={!disabled ? onClickOpen : undefined}
        {disabled}
      >
        <slot name="arrow">
          <ChevronDown
            class={styls.icon}
            size={22}
            aria-hidden="true"
            focusable="false"
          />
        </slot>
      </button>
      <ul
        id="{id ?? name}-listbox"
        role="listbox"
        aria-label={label}
        aria-multiselectable={multiple}
        class={styls.options}
        class:top={toTop}
        bind:this={listbox}
      >
        {#each optionsToShow as option (option.key ?? option.value)}
          {@const selected = multiple
            ? isSelected($data[name], option.value)
            : $data[name] === option.value}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <li
            id="{id ?? name}-option-{option.key ?? option.value}"
            role="option"
            aria-disabled={!!option.disabled}
            aria-selected={selected}
            class={styls.option}
            data-value={option.value}
            on:click|stopPropagation={(event) => onChoose(event.currentTarget)}
          >
            <slot name="option" {option} {selected}>
              {option.label}
              {#if selected}
                <Check size={18} class={styls.icon} />
              {/if}
            </slot>
          </li>
        {/each}
        {#if optionsToShow.length === 0}
          <li class={styls.empty} role="presentation">
            <slot name="empty">No options</slot>
          </li>
        {/if}
      </ul>
    </div>
    {#if $errors[name]}
      <span
        class={styls.error}
        role="presentation"
        transition:fade={{ duration: 200 }}
      >
        <slot name="error" error={$errors[name]}>
          {$errors[name]}
        </slot>
      </span>
    {/if}
  </label>
{/key}

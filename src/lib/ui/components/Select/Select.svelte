<script lang="ts">
  import { getContext, onDestroy } from "svelte";
  import { slide } from "svelte/transition";

  import type { InputContext } from "../../../logic/typing/globals.proptypes";
  import type { Props, Select } from "./Select.proptypes";

  import * as stylesinternal from "./Select.styles";

  export let name: Props["name"];
  export let id: Props["id"] = null;
  export let options: Props["options"] = [];
  export let placeholder: Props["placeholder"] = "";
  export let context: Props["context"] = "form";
  export let datas: Props["datas"] = {};
  export let styles: Props["styles"] = {};
  export let onSelect: Props["onSelect"] = () => {};
  export let t: Props["t"] = (msg: string) => msg;

  let container: Select = null;
  let active = false;
  let value = "";

  const form = getContext<InputContext>(context);
  const { errors, setField, data } = $form;

  function handleCloseSelect() {
    active = !active;
  }

  function handleSelect(event: MouseEvent) {
    const option = event.target as HTMLDivElement;
    if (!option.dataset.select) {
      const valueSelected = option.dataset.value;
      if (valueSelected) {
        value = valueSelected;
        setField(name, valueSelected);
        onSelect?.(valueSelected);
      }
      active = false;
    } else {
      handleCloseSelect();
      if (container) container.lastElementChild?.scrollTo(0, 0);
    }
  }

  $: datasets = Object.keys(datas).reduce(
    (acc, key) => ({
      ...acc,
      [`data-${key}`]: datas[key],
    }),
    {}
  );

  $: showedValue =
    options.find(
      ({ value: option }) => option === value || option === $data[name]
    )?.label || (value !== "" ? value : placeholder);

  $: {
    if (options.length === 1 && value !== options[0].value) {
      value = options[0].value;
      setField(name, options[0].value);
      onSelect?.(options[0].value);
    }
  }

  onDestroy(() => {
    setField(name, undefined);
  });
</script>

<label
  for={id ?? name}
  class={styles.field ?? stylesinternal.field}
  {...datasets}
>
  <div
    class={styles.select ?? stylesinternal.select}
    class:active
    role="listbox"
    tabIndex={-1}
    data-select="true"
    bind:this={container}
    on:click={!datas?.disabled ? handleSelect : undefined}
    on:keypress={() => {}}
  >
    <p
      role="presentation"
      class={styles.value ?? stylesinternal.value}
      data-gradient={showedValue === placeholder}
    >
      {showedValue}
      {#if $errors[name]}
        <span class={styles.error ?? stylesinternal.error}
          >{t(`${$errors[name]}`)}</span
        >
      {/if}
    </p>
    {#if active}
      <div
        class={styles.options ?? stylesinternal.options}
        on:mouseleave={active ? handleCloseSelect : undefined}
        transition:slide|local={{ delay: 200 }}
        role="presentation"
      >
        {#each options as option (option.key ?? option.value)}
          <span
            role="option"
            aria-selected={!option.disabled}
            tabindex={-1}
            data-value={option.value}
            class={styles.option ?? stylesinternal.option}
          >
            <span role="presentation">{option.label}</span>
          </span>
        {/each}
      </div>
    {/if}
  </div>
</label>

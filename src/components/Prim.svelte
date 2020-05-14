<script>
  import { createEventDispatcher } from "svelte";
  import * as jexl from "jexl";
  import { onMount } from "svelte";

  export let form;
  export let parentValue;
  export let rootValue;
  export let value;

  const dispatcher = createEventDispatcher();

  $: checkReactivity(rootValue, parentValue);

  let isVisible = true;

  const onChange = event => {
    let value;
    switch (event.target.type) {
      case "text":
        value = event.target.value;
        break;
      case "checkbox":
        value = event.target.checked;
        break;
      case "number":
        value = Number(event.target.value);
        break;
      default:
        value = event.target.value;
        break;
    }
    dispatcher("valueChange", {
      newValue: value,
      property: form.property
    });
  };

  const checkReactivity = (rootValue_, parentValue_) => {
    const reactivity = form.reactivity != null ? form.reactivity : [];
    if (reactivity.length > 0) {
      let results = [];
      reactivity.forEach(r => {
        const scope = r.scope === "root" ? rootValue_ : parentValue_;
        results.push({
          result: jexl.default.evalSync(r.expression, scope),
          type: r.type
        });
      });
      const visibleWhen = results.filter(
        result => result.type === "visibleWhen"
      );
      const clearWhen = results.filter(result => result.type === "clearWhen");
      isVisible = visibleWhen.every(result => result.result);
      if (clearWhen.every(result => result.result)) {
        if(value != null)  {
          dispatcher("valueChange", {
            newValue: null,
            property: form.property
          });
        }
      }
    }
  };
</script>

<style>
  input[type="checkbox"] {
    transform: scale(2);
    float: left;
    margin-top: 12px;
  }
  .checkbox-label {
    margin-top: 5px;
    margin-left: 10px;
  }
</style>

{#if form.property != null && isVisible}
  {#if form.elementSubType === 'text'}
    <div class="form-group">
      <label for={form.property}>{form.property}</label>
      <input on:blur={onChange} type="text" class="form-control" {value} />
    </div>
  {:else if form.elementSubType === 'number'}
    <div class="form-group">
      <label for={form.property}>{form.property}</label>
      <input on:blur={onChange} type="number" class="form-control" {value} />
    </div>
  {:else if form.elementSubType === 'boolean'}
    <div class="form-group">
      <label class="checkbox-label" for={form.property}>{form.property}</label>
      <input type="checkbox" checked={value} on:change={onChange} />
    </div>
  {/if}
{/if}

<script>
  import Obj from "./components/Obj.svelte";
  import { formConfig } from "./store/form-config";
  import { onMount, onDestroy } from "svelte";

  let form;
  let value;
  let originalValue;

  const unsubscribe = formConfig.subscribe(config => {
    if (config != null) {
      form = JSON.parse(JSON.stringify(config.form));
      value = JSON.parse(JSON.stringify(config.value));
      originalValue = JSON.parse(JSON.stringify(config.value));
    }
  });

  onMount(async () => {
    await formConfig.retrieve("moduleOne", "flowOne");
  });

  onDestroy(unsubscribe);

  const onValueChange = event => {
    value[event.detail.property] = event.detail.newValue;
  };

  const logValue = () => {
    console.log(value);
  };

  const resetValue = () => {
    value = JSON.parse(JSON.stringify(originalValue));
  };
</script>

<nav class="navbar navbar-dark bg-dark">
  <a class="navbar-brand" href="/">Brand</a>
  <button class="navbar-toggler" type="button">
    <span class="navbar-toggler-icon" />
  </button>
</nav>
{#if form != null && value != null}
  <div class="container mt-4 mb-4">
    <Obj
      bind:form
      value={value[form.property]}
      on:valueChange={onValueChange}
      parentValue={value}
      rootValue={value} />
    <button on:click={logValue} type="button" class="btn btn-primary btn-block">
      View Value
    </button>
    <button
      on:click={resetValue}
      type="button"
      class="btn btn-secondary btn-block">
      Reset Value
    </button>
  </div>
{/if}

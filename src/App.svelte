<script>
  import Obj from "./components/Obj.svelte";
  import { formConfig } from "./store/form-config";
  import { onMount, onDestroy } from "svelte";
  import Button, { Label } from "@smui/button";

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

{#if form != null && value != null}
  <div>
    <Button>
      <Label>Do Something</Label>
    </Button>
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

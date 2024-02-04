<script setup lang="ts">
const props = defineProps({
  error: Object,
})

if (props?.error?.url != '/') {
  clearError({ redirect: '/' })
}
</script>

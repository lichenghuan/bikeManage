<template>
    <el-tag>{{ brand }}</el-tag>
</template>

<script setup>
import { ref, computed } from 'vue';

// Props
const props = defineProps({
    brandId: {
        type: String,
        required: true
    },
    bikeBrands: {
        type: Array,
        required: true
    }
});

// Computed property to find the brand name based on brandId
const brand = computed(() => {
    const foundBrand = props.bikeBrands.find(brand => brand._id === props.brandId);
    return foundBrand ? foundBrand.brandName : '未知品牌';
});
</script>
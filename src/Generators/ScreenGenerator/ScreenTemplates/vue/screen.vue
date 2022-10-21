<template>  
    <div>       
        <% if (isTailwind) { %>
        <h1 class="text-4xl dark:text-white dark:bg-vueBlack">Welcome to <%= screenName %> Screen</h1>
        <% } else { %>
        <h1>Welcome to <%= screenName %> Screen</h1>
        <% } %>
    </div>
</template>

<script>
export default {
    name: "<%= screenName %>",
};
</script>

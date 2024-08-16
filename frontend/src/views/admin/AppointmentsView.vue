<script setup>
    import AdminApp from '../../components/AdminApp.vue'
    import { useUserStore } from '@/stores/user';

    const user = useUserStore()

</script>

<template>
    <p class="text-white text-lg mt-5">
        A continuacion podras administrar tus proximas citas
    </p>

    <p v-if="user.loading" class="text-white text-2xl text-center mt-5">
        Cargando...
    </p>

    <div v-else>
        <p v-if="user.noAppointments" class="text-white text-2xl text-center mt-5">
            No tienes proximas citas
        </p>

        <div v-else class="grid grid-cols-1 gap-5 mt-10">
            <AdminApp
                v-for="appointment in user.userAppointments"
                :key="appointment._id"
                :appointment="appointment"
            />
        </div>
    </div>
</template>


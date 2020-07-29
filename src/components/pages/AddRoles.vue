<template>
	<div class = 'role__area'>
		<roleButton
			v-for = 'role in roleData'
			:key = 'role.id'
			:roleName = 'role.name'></roleButton>
	</div>
</template>

<script>
import roles from '@/assets/roleData.json'
import RoleButton from '@/components/modules/RoleButton'
export default {
	data () {
		return {
			roleData : roles
		}
	},
	components: {
		'roleButton': RoleButton
	}
}
</script>

<style scoped>
.role__area {
	width: 500px;
}
</style>
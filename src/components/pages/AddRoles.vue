<template>
	<div class = 'role__area'>
		<div class = 'camp__area' v-for = 'camp in roleData' :key = 'camp.id'>
			<p> {{ camp.name }} </p>
			<roleButton v-for = 'data in camp.roles' :key = 'data.id' :roleData = 'data' :camp = 'camp.name'>
			</roleButton>
		</div>
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
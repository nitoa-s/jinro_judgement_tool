<template>
	<div class = 'role_page'>
		<div class = 'role_count'>
			役職数：{{ joinRoleCount }}
		</div>
		<div class = 'camp_area' v-for = 'camp in roles' :key = 'camp.id'>
			<div class = 'camp_name'>
				{{ camp.name }}
			</div>
			<div class = 'roles_row_area' v-for = '(row, index) in groupRoles(camp.roles)' :key = 'index'>
				<roleButton v-for = 'role in row' :key = 'role.id' :roleData = 'role' :camp = 'camp.name'></roleButton>
			</div>
		</div>
	</div>
</template>

<script>
import roles from '@/assets/roleData.json'
import RoleButton from '@/components/modules/RoleButton'
export default {
	data () {
		return {
			roles,
			sliceNum: 7
		}
	},
	components: {
		'roleButton': RoleButton
	},
	computed: {
		joinRoleCount () {
      return this.$store.getters.jinroRoles.length
    }
	},
	methods: {
		groupRoles(roles) {
			const arrayLength = roles.length
			const groupedArray = []
			for( let index = 0; index < Math.ceil(arrayLength / this.sliceNum); index++ ) {
        let groupedFirstIndex = index * this.sliceNum;
        groupedArray.push(roles.slice(groupedFirstIndex, groupedFirstIndex + this.sliceNum))
      }
      return groupedArray
		}
	}
}
</script>

<style scoped>
.role_count {
	color: white;
	font: 20px;
	font-weight: bold;
}
.role_page {
	padding: 10px 5px;
}

.camp_area {
	margin: 10px;
}

.camp_name {
	color: white;
	font: 30px;
	font-weight: bold;
}

.roles_row_area {
	display: flex;
}
</style>
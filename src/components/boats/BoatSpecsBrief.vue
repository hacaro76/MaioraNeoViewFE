<template>
	<div v-if="boatItem" id="product-specifications" class="sezione background-gold top-gold bottom-gold">
		<h2 class="uppercase">Specifications</h2>
		<table>
			<thead>
				<tr>
					<th class="gold" v-if="getVal('lenght')">Overall Lenght</th>
					<th class="gold" v-if="getVal('beam')">Maximum Beam</th>
					<th class="gold" v-if="getVal('draft')">Maximum Draft</th>
					<th class="gold" v-if="getVal('displacement')">Full Load Displacement</th>
					<th class="gold" v-if="getVal('tonnage')">Gross Tonnage</th>
					<th class="gold" v-if="getVal('range')">Range at 10 Knots</th>
					<th class="gold" v-if="getVal('range11')">Range at 11 Knots</th>
					<th class="gold" v-if="getVal('range12')">Range at 12 Knots</th>
					<th class="gold" v-if="getVal('range14')">Range at 14 Knots</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td v-if="getVal('lenght')">{{ getVal('lenght') }}</td>
					<td v-if="getVal('beam')">{{ getVal('beam') }}</td>
					<td v-if="getVal('draft')">{{ getVal('draft') }}</td>
					<td v-if="getVal('displacement')">{{ getVal('displacement') }}</td>
					<td v-if="getVal('tonnage')">{{ getVal('tonnage') }}</td>
					<td v-if="getVal('range')">{{ getVal('range') }}</td>
					<td v-if="getVal('range11')">{{ getVal('range11') }}</td>
					<td v-if="getVal('range12')">{{ getVal('range12') }}</td>
					<td v-if="getVal('range14')">{{ getVal('range14') }}</td>
				</tr>
			</tbody>
		</table>
		<div v-if="getVal('exterior') || getVal('interior') || getVal('accomodation') || getVal('crew')">
			<hr>
			<table>
				<thead>
					<tr>
						<th v-if="getVal('exterior')" class="gold">Concept & Exterior Design</th>
						<th v-if="getVal('interior')" class="gold">Interior & Deck Design</th>
						<th v-if="getVal('accomodation')" class="gold">Accomodation for Owner &amp; Guests</th>
						<th v-if="getVal('crew')" class="gold">Accomodation for Crew</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td v-if="getVal('exterior')" v-html="getVal('exterior')"></td>
						<td v-if="getVal('interior')" v-html="getVal('interior')"></td>
						<td v-if="getVal('accomodation')">{{ getVal('accomodation') }}</td>
						<td v-if="getVal('crew')">{{ getVal('crew') }}</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div v-if="documents">
			<hr>
		
			<BoatDocs v-if="documents" :documents="documents" />
		</div>
		
	</div>
		
</template>

<script>
	import BoatDocs from '../boats/BoatDocs';

	export default {
		name: 'BoatSpecsBrief',
		props: ['id', 'boatItem', 'documents'],
		methods: {
			getVal(id) {
				let boatItemVal = this.boatItem.specifications.find((item) => item.id === id);
				return (boatItemVal && boatItemVal.value !== '') ? boatItemVal.value : false
			}
		},
		components: {
			BoatDocs
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	table {
		width: 100%;
		border-collapse: collapse;
		margin: 40px auto;
	}
	th, td {
		text-align: center;
		padding: 8px 10px;
		vertical-align: top;
		text-transform: uppercase;
		font-size: 18px;
		line-height: 22px;
		border-left: 1px solid #D4D2C3;
		border-right: 1px solid #D4D2C3;
	}
	th:first-child, td:first-child {
		border-left: 0;
	}
	th:last-child, td:last-child {
		border-right: 0;
	}
	th {
		font-family: "Avenir Regular", Helvetica, Arial, "sans-serif";
	}
	td {
		font-family: "Avenir Regular", Helvetica, Arial, "sans-serif";
	}
	#product-specifications .box-download {
		margin-bottom: 0;
	}
</style>

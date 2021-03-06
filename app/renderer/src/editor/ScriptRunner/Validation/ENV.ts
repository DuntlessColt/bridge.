import JSONTree from '../../JsonTree'
import FileType from '../../FileType'
import TabSystem from '../../../TabSystem'
import LightningCache from '../../LightningCache'
import { IDisposable } from '../../../Types/disposable'

export const ENV = (
	disposables: IDisposable[],
	Node: JSONTree,
	filePath = TabSystem.getCurrentFilePath()
) => ({
	Node,
	get GlobalNode() {
		let currentNode = Node

		while (currentNode.parent) {
			currentNode = currentNode.parent
		}

		return currentNode
	},
	get FileType() {
		return FileType.get(filePath)
	},
	File: {
		usesEntity(identifier: string) {
			let globalNode = Node

			while (globalNode.parent) {
				globalNode = globalNode.parent
			}

			return (
				globalNode.get('#;bridge_node_skip;#/description/identifier')
					?.data === identifier ||
				globalNode.get(
					'#;bridge_node_skip;#/description/runtime_identifier'
				)?.data === identifier
			)
		},
	},
	Tab: {
		setUnsaved: () => TabSystem.setCurrentUnsaved(),
	},
	get LightningCache() {
		return LightningCache.getCompiled()
	},
})

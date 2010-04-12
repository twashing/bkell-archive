<?xml version="1.0"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	
	
	<xsl:template match="/">
		
		<xsl:message>'baron-dcr.xslt' Processing started</xsl:message>
		<xsl:comment> Generated from 'baron-dcr.xslt' </xsl:comment>
		<xsl:comment> a DCR document will only produce 1 Baron record </xsl:comment>
		
		<records>
			
			<record >
				
				<xsl:apply-templates />
				
			</record>
		</records>
		
	</xsl:template>
	
	
	<xsl:template match="*|text()" >
		
		<xsl:apply-templates />
	</xsl:template>
	
	
	<xsl:template match="item[@name='associated_section']/value" >
		<xsl:comment>Derived from the mapping... //records/record/SubjectTag 	==> //**/item[@name="associated_section"]/value/&lt;content&gt;
		</xsl:comment>
		<SubjectTag>
			<xsl:value-of select="." />
		</SubjectTag>
	</xsl:template>
	
	<xsl:template match="item[@name='story_title']/value" >
		<xsl:comment>
			Derived from the mapping... //records/record/Title 		==> //**/item[@name="story_title"]/value/&lt;content&gt;
		</xsl:comment>
		<Title>
			<xsl:value-of select="." />
		</Title>
	</xsl:template>
	
	<xsl:template match="item[@name='dek']/value" >
		<xsl:comment>Derived from the mapping... //records/record/Abstract        ==> //**/item[@name="dek"]/value/&lt;content&gt;
		</xsl:comment>
		<Abstract>
			<xsl:value-of select="." />
		</Abstract>
	</xsl:template>
	
	<xsl:template match="item[@name='body_paragraph']/value" >
		<xsl:comment>Derived from the mapping... //records/record/Body        ==> //**/item[@name="body_paragraph"]
		</xsl:comment>
		<Body>
			<xsl:value-of select="." />
		</Body>
	</xsl:template>
	

</xsl:stylesheet>
